import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export const notFound = (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(`Not found: ${req.originalUrl}`, 404));
};

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (!(err instanceof AppError)) {
    console.error(err);
  }
  const error = err instanceof AppError ? err : new AppError('Internal server error', 500);
  res.status(error.statusCode).json({ message: error.message });
};
