import type { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import type { UserRole } from '../models/User';
import { AppError } from '../utils/AppError';

export const requireAuth = (req: Request, _res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return next(new AppError('Unauthorized', 401));
  }

  const token = header.replace('Bearer ', '').trim();
  try {
    const payload = verifyAccessToken(token);
    req.user = { id: payload.sub, role: payload.role as UserRole };
    return next();
  } catch {
    return next(new AppError('Invalid token', 401));
  }
};
