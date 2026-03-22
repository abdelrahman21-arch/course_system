import { connectDb } from '../config/db';
import { Request, Response, NextFunction } from 'express';

export const dbConnectMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await connectDb();
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ 
      message: 'Database connection failed',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};
