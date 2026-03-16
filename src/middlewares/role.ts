import type { Request, Response, NextFunction } from 'express';
import type { UserRole } from '../models/User';
import { AppError } from '../utils/AppError';

export const requireRole = (...roles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const role = req.user?.role;
    if (!role || !roles.includes(role)) {
      return next(new AppError('Forbidden', 403));
    }
    return next();
  };
};
