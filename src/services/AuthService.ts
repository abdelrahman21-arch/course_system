import { UserRepository } from '../repositories/UserRepository';
import { AppError } from '../utils/AppError';
import { hashPassword, verifyPassword } from '../utils/password';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { hashToken } from '../utils/token';
import type { UserRole } from '../types/user';

export class AuthService {
  constructor(private userRepo: UserRepository) {}

  async register(input: { email: string; password: string; name: string; role: UserRole }) {
    const existing = await this.userRepo.findByEmail(input.email);
    if (existing) {
      throw new AppError('Email already in use', 409);
    }

    const passwordHash = await hashPassword(input.password);
    const user = await this.userRepo.create({
      email: input.email,
      passwordHash,
      role: input.role,
      name: input.name
    });

    return { id: user.id, email: user.email, role: user.role, name: user.name };
  }

  async login(input: { email: string; password: string }) {
    const user = await this.userRepo.findByEmail(input.email);
    if (!user || user.status !== 'active') {
      throw new AppError('Invalid credentials', 401);
    }

    const match = await verifyPassword(input.password, user.passwordHash);
    if (!match) {
      throw new AppError('Invalid credentials', 401);
    }

    const payload = { sub: user.id, role: user.role };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);
    const refreshTokenHash = hashToken(refreshToken);
    await this.userRepo.updateRefreshTokenHash(user.id, refreshTokenHash);

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    const payload = verifyRefreshToken(refreshToken);
    const user = await this.userRepo.findById(payload.sub);
    if (!user || !user.refreshTokenHash) {
      throw new AppError('Invalid refresh token', 401);
    }

    const incomingHash = hashToken(refreshToken);
    if (incomingHash !== user.refreshTokenHash) {
      throw new AppError('Invalid refresh token', 401);
    }

    const newPayload = { sub: user.id, role: user.role };
    const newAccessToken = signAccessToken(newPayload);
    const newRefreshToken = signRefreshToken(newPayload);
    await this.userRepo.updateRefreshTokenHash(user.id, hashToken(newRefreshToken));

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async logout(userId: string) {
    await this.userRepo.updateRefreshTokenHash(userId, null);
  }
}
