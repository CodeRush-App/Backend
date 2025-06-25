import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import './config/env';

async function main() {
  const serverURL = process.env.NODE_ENV === 'development' ? `http://localhost:${process.env.PORT}` : 'https://coderush.loca.lt';

  const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${serverURL}`);
  });

  // Graceful shutdown
  const gracefulShutdown = async (signal: string) => {
    console.log(`\nReceived ${signal}. Starting graceful shutdown...`);

    // 1. Stop accepting new connections
    server.close(async () => {
      console.log('HTTP server closed');

      // 2. Exit the process
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
