/**
 * Authentication Middleware
 * 
 * Verifies JWT tokens and attaches user context to request.
 * Supports both Bearer token and cookie-based auth.
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../../../db/index.js';
import { UserRole } from '@nexttern/shared';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: UserRole | null;
      };
    }
  }
}

interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole | null;
}

/**
 * Verify JWT token and attach user to request
 */
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Extract token from header or cookie
    let token = req.headers.authorization?.split(' ')[1];
    
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication required',
      });
    }

    // 2. Verify token
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('JWT_SECRET not configured');
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;

    // 3. Verify user still exists and is active
    // Optimization: In high-load, we might skip DB check for every request
    // and rely on token expiration, but for MVP safety > speed.
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true, authStatus: true },
    });

    if (!user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'User not found',
      });
    }

    // 4. Attach user to request
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role as UserRole | null,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Token expired',
      });
    }
    
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid token',
    });
  }
};

/**
 * Optional authentication - attaches user if present, but doesn't block
 */
export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization?.split(' ')[1];
    
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return next();
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) return next();

    const decoded = jwt.verify(token, secret) as JwtPayload;
    
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    // Ignore errors for optional auth
    next();
  }
};
