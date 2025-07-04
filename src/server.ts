import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import { connectToDatabase } from './config/database';
import { prisma } from './config/database';
import './config/env';
import type {} from './types/express';

async function main() {
  await connectToDatabase();

  const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on https://coderush.loca.lt`);
  });

  // Graceful shutdown
  const gracefulShutdown = async (signal: string) => {
    console.log(`\nReceived ${signal}. Starting graceful shutdown...`);

    // 1. Stop accepting new connections
    server.close(async () => {
      console.log('HTTP server closed');

      // 2. Close database connection
      try {
        await prisma.$disconnect();
        console.log('Database connection closed');
      } catch (err) {
        console.error('Error during database disconnection:', err);
      }

      // 3. Exit the process
      process.exit(0);
    });

    // Force close server after 10 seconds
    setTimeout(() => {
      console.error('Forcing shutdown...');
      process.exit(1);
    }, 10000).unref();
  };

  // Register signal handlers
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
}

if (process.env.NODE_ENV === 'production') {
  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
  });
}

main().catch((error) => {
  console.error('Error starting server:', error);
  process.exit(1);
});
