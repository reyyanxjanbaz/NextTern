/**
 * NextTern Database Module
 * 
 * Re-exports database client and utilities.
 */

export { prisma, disconnectDatabase, checkDatabaseHealth } from './client.js';
export { PrismaClient } from '../generated/prisma/index.js';

// Re-export all Prisma types for convenience
export * from '../generated/prisma/index.js';
