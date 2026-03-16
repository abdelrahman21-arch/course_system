import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export type JwtPayload = { sub: string; role: string };

export const signAccessToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, env.jwtAccessSecret, { expiresIn: env.jwtAccessExpiresIn });
};

export const signRefreshToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, env.jwtRefreshSecret, { expiresIn: env.jwtRefreshExpiresIn });
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.jwtAccessSecret) as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.jwtRefreshSecret) as JwtPayload;
};
