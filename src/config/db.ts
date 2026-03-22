declare global {
  var mongoose: {
    conn: typeof import('mongoose') | null;
    promise: Promise<typeof import('mongoose')> | null;
  };
}

import mongoose from 'mongoose';
import { env } from './env';
mongoose.set('bufferTimeoutMS', 30000);

const getMongoHost = (uri: string): string => {
  try {
    const parsed = new URL(uri);
    return parsed.host || 'unknown';
  } catch {
    return 'unknown';
  }
};

let cached = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export const connectDb = async (): Promise<typeof mongoose> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('Attempting to connect to MongoDB...');
    console.log(`MongoDB envs: MONGODB_URI=${!!process.env.MONGODB_URI}, MONGO_URI=${!!process.env.MONGO_URI}, host=${getMongoHost(env.mongoUri)}`);
    cached.promise = mongoose
      .connect(env.mongoUri, {
        maxPoolSize: 1,
        minPoolSize: 0,
        socketTimeoutMS: 60000,
        connectTimeoutMS: 30000,  // Increased further
        serverSelectionTimeoutMS: 30000,  // Increased further
        retryWrites: true,
        w: 'majority',
        directConnection: false,
        ssl: true
      })
      .catch((err) => {
        console.error('MongoDB connection error:', err);
        cached.promise = null;
        throw err;
      });
  }

  cached.conn = await cached.promise;
  console.log('MongoDB connected successfully');

  mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error event:', err);
  });

  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected via event');
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected via event');
  });

  return cached.conn;
};




