import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import type { JwtPayload } from '../types/auth';

export const signAccessToken = (payload: JwtPayload): string => {
  const options: jwt.SignOptions = {
    expiresIn: env.jwtAccessExpiresIn as jwt.SignOptions['expiresIn']
  };
  return jwt.sign(payload, env.jwtAccessSecret, options);
};

export const signRefreshToken = (payload: JwtPayload): string => {
  const options: jwt.SignOptions = {
    expiresIn: env.jwtRefreshExpiresIn as jwt.SignOptions['expiresIn']
  };
  return jwt.sign(payload, env.jwtRefreshSecret, options);
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.jwtAccessSecret) as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.jwtRefreshSecret) as JwtPayload;
};
