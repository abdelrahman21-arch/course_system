import { Types } from 'mongoose';
import { UserModel, type User } from '../models/User';

export class UserRepository {
  async findByEmail(email: string) {
    return UserModel.findOne({ email }).exec();
  }

  async findById(id: string | Types.ObjectId) {
    return UserModel.findById(id).exec();
  }

  async create(data: Pick<User, 'email' | 'passwordHash' | 'role' | 'name'>) {
    return UserModel.create(data);
  }

  async updateRefreshTokenHash(userId: string, hash: string | null) {
    return UserModel.findByIdAndUpdate(userId, { refreshTokenHash: hash }, { new: true }).exec();
  }
}
