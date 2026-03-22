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
    cached.promise = mongoose.connect(env.mongoUri, {
      maxPoolSize: 1,
      minPoolSize: 0,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 15000,
      serverSelectionTimeoutMS: 10000,
      family: 4 // Use IPv4, IPv6 can be slow on Vercel
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
