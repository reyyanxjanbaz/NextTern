/**
 * NextTern Database Client
 * 
 * Singleton Prisma client instance for database operations.
 * Handles connection pooling and prevents multiple instances in development.
 */

import { PrismaClient } from '../generated/prisma/index.js';

// Declare global type for development hot-reload
declare global {
   
  var __prisma: PrismaClient | undefined;
}

/**
 * Create Prisma client with logging configuration
 */
function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });
}

/**
 * Singleton Prisma client instance.
 * In development, reuse the same instance across hot reloads.
 * In production, create a new instance.
 */
export const prisma: PrismaClient =
  globalThis.__prisma ?? createPrismaClient();

// Store in global for development hot-reload
if (process.env.NODE_ENV === 'development') {
  globalThis.__prisma = prisma;
}

/**
 * Graceful shutdown helper.
 * Call this when the application is shutting down.
 */
export async function disconnectDatabase(): Promise<void> {
  await prisma.$disconnect();
}

/**
 * Health check for database connection.
 */
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}

export default prisma;
