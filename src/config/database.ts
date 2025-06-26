import { PrismaClient } from '@prisma';

declare global {
  var prisma: PrismaClient | undefined;
}

// global variable for development and new instances for production
export const prisma =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

/**
 * Helper function to connect to the database
 * @returns PrismaClient instance
 */
export async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
    return prisma;
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
}

export type { PrismaClient } from '@prisma/client';
