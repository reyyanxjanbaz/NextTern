/**
 * Global Error Handler Middleware
 * 
 * Constitution Article I.3: Anxiety Is a UX Bug.
 * Errors must be explained clearly with recovery suggestions.
 * No silent failures.
 */

import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '../../generated/prisma/index.js';

/**
 * Standard API Error response structure
 */
interface ApiErrorResponse {
  error: string;
  message: string;
  code?: string;
  details?: unknown;
  suggestion?: string;
}

/**
 * Custom Application Error class
 */
export class AppError extends Error {
  public statusCode: number;
  public code?: string;
  public suggestion?: string;

  constructor(
    message: string,
    statusCode: number = 500,
    code?: string,
    suggestion?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.suggestion = suggestion;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Global error handling middleware
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(`[Error] ${req.method} ${req.path}:`, err);

  // 1. Handle Custom App Errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: getErrorName(err.statusCode),
      message: err.message,
      code: err.code,
      suggestion: err.suggestion,
    } as ApiErrorResponse);
  }

  // 2. Handle Zod Validation Errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Invalid input data',
      details: err.errors,
      suggestion: 'Please check your input and try again.',
    } as ApiErrorResponse);
  }

  // 3. Handle Prisma Database Errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return handlePrismaError(err, res);
  }

  // 4. Handle JSON Parsing Errors
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Invalid JSON payload',
      suggestion: 'Check your request body format.',
    } as ApiErrorResponse);
  }

  // 5. Default Internal Server Error
  // Hide implementation details in production
  const isDev = process.env.NODE_ENV === 'development';
  
  return res.status(500).json({
    error: 'Internal Server Error',
    message: isDev ? err.message : 'Something went wrong on our end.',
    details: isDev ? err.stack : undefined,
    suggestion: 'Please try again later or contact support if the issue persists.',
  } as ApiErrorResponse);
};

/**
 * Helper to map status codes to error names
 */
function getErrorName(statusCode: number): string {
  switch (statusCode) {
    case 400: return 'Bad Request';
    case 401: return 'Unauthorized';
    case 403: return 'Forbidden';
    case 404: return 'Not Found';
    case 409: return 'Conflict';
    case 422: return 'Unprocessable Entity';
    case 429: return 'Too Many Requests';
    default: return 'Server Error';
  }
}

/**
 * Handle Prisma-specific errors
 */
function handlePrismaError(
  err: Prisma.PrismaClientKnownRequestError,
  res: Response
) {
  switch (err.code) {
    case 'P2002': // Unique constraint violation
      return res.status(409).json({
        error: 'Conflict',
        message: 'A record with this value already exists.',
        details: err.meta,
        suggestion: 'Try using a different email or identifier.',
      });
    
    case 'P2025': // Record not found
      return res.status(404).json({
        error: 'Not Found',
        message: 'The requested resource could not be found.',
        suggestion: 'Check the ID and try again.',
      });

    default:
      console.error('Unhandled Prisma Error:', err.code);
      return res.status(500).json({
        error: 'Database Error',
        message: 'An error occurred while accessing the database.',
        suggestion: 'Please try again later.',
      });
  }
}
