import app from './app';
import { connectDb } from './config/db';
import { env } from './config/env';

const start = async () => {
  try {
    await connectDb();
    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
};

// Only start server in local development
// In Vercel, the serverless function doesn't use this
if (process.env.NODE_ENV !== 'production') {
  start();
}

export default app;
