declare global {
  var mongoose: {
    conn: typeof import('mongoose') | null;
    promise: Promise<typeof import('mongoose')> | null;
  };
}

import mongoose from 'mongoose';
import { env } from './env';

let cached = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export const connectDb = async (): Promise<typeof mongoose> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    try {
      console.log('Attempting to connect to MongoDB...');
      cached.promise = mongoose.connect(env.mongoUri, {
        maxPoolSize: 1,
        minPoolSize: 0,
        socketTimeoutMS: 60000,
        connectTimeoutMS: 30000,  // Increased further
        serverSelectionTimeoutMS: 30000,  // Increased further
        retryWrites: true,
        w: 'majority',
        directConnection: false,
        ssl: true
      });
    } catch (err) {
      console.error('MongoDB connection error:', err);
      throw err;
    }
  }

  cached.conn = await cached.promise;
  console.log('MongoDB connected successfully');
  return cached.conn;
};
