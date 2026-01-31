/**
 * Authentication Routes
 * 
 * Handles magic link authentication flow:
 * 1. POST /auth/request - Request magic link
 * 2. POST /auth/verify - Verify magic link token
 * 3. POST /auth/logout - Logout user
 * 4. GET /auth/me - Get current user
 */

import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../../db/client.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';
import crypto from 'crypto';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key';
const MAGIC_LINK_EXPIRY_MINUTES = 15;

// =============================================================================
// POST /auth/request - Request a magic link
// =============================================================================
router.post('/request', async (req: Request, res: Response) => {
  try {
    const { email, role } = req.body;

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate role if provided
    if (role && !['STUDENT', 'RECRUITER'].includes(role)) {
      return res.status(400).json({ error: 'Role must be STUDENT or RECRUITER' });
    }

    // Find or create user
    let user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          role: role || null,
          authStatus: 'PENDING',
        },
      });
    }

    // Generate magic link token
    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

    // Store magic link in database
    const expiresAt = new Date(Date.now() + MAGIC_LINK_EXPIRY_MINUTES * 60 * 1000);
    
    await prisma.magicLink.create({
      data: {
        tokenHash,
        email,
        userId: user.id,
        expiresAt,
      },
    });

    // In production, send email with magic link
    // For dev, log the link
    const magicLink = `${process.env.APP_URL || 'http://localhost:5173'}/verify?token=${rawToken}`;
    console.log(`[Auth] Magic link for ${email}: ${magicLink}`);

    res.json({
      success: true,
      message: 'Magic link sent to your email',
      // Only include token in development for testing
      ...(process.env.NODE_ENV !== 'production' && { devToken: rawToken }),
    });
  } catch (error) {
    console.error('[Auth] Request error:', error);
    res.status(500).json({ error: 'Failed to send magic link' });
  }
});

// =============================================================================
// POST /auth/verify - Verify magic link and login
// =============================================================================
router.post('/verify', async (req: Request, res: Response) => {
  try {
    const { token, role } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    // Hash the token to compare with stored hash
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // Find magic link
    const magicLink = await prisma.magicLink.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!magicLink) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    if (magicLink.used) {
      return res.status(401).json({ error: 'Token has already been used' });
    }

    if (magicLink.expiresAt < new Date()) {
      return res.status(401).json({ error: 'Token has expired' });
    }

    // Mark token as used
    await prisma.magicLink.update({
      where: { id: magicLink.id },
      data: { used: true },
    });

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: magicLink.userId! },
      data: {
        emailVerified: true,
        authStatus: 'AUTHENTICATED',
        lastLoginAt: new Date(),
        // Set role if provided and not already set
        ...(role && !magicLink.user?.role && { 
          role,
          roleAssignedAt: new Date(),
        }),
      },
      include: {
        profile: true,
      },
    });

    // Create session
    const sessionExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const session = await prisma.session.create({
      data: {
        userId: updatedUser.id,
        expiresAt: sessionExpiresAt,
      },
    });

    // Generate JWT
    const jwtToken = jwt.sign(
      {
        userId: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
        sessionId: session.id,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set cookie
    res.cookie('token', jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      success: true,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
        emailVerified: updatedUser.emailVerified,
        onboardingComplete: updatedUser.onboardingComplete,
        profile: updatedUser.profile,
      },
      token: jwtToken,
    });
  } catch (error) {
    console.error('[Auth] Verify error:', error);
    res.status(500).json({ error: 'Failed to verify token' });
  }
});

// =============================================================================
// POST /auth/demo-login - Demo login for testing (skip magic link)
// =============================================================================
router.post('/demo-login', async (req: Request, res: Response) => {
  try {
    const { email, role } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Only allow in development
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({ error: 'Demo login not available in production' });
    }

    // Find or create user
    let user = await prisma.user.findUnique({ 
      where: { email },
      include: { profile: true },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          role: role || 'STUDENT',
          roleAssignedAt: new Date(),
          emailVerified: true,
          authStatus: 'AUTHENTICATED',
        },
        include: { profile: true },
      });
    } else {
      // Update existing user
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          authStatus: 'AUTHENTICATED',
          lastLoginAt: new Date(),
        },
        include: { profile: true },
      });
    }

    // Create session
    const sessionExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await prisma.session.create({
      data: {
        userId: user.id,
        expiresAt: sessionExpiresAt,
      },
    });

    // Generate JWT
    const jwtToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        sessionId: session.id,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('token', jwtToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        emailVerified: user.emailVerified,
        onboardingComplete: user.onboardingComplete,
        profile: user.profile,
      },
      token: jwtToken,
    });
  } catch (error) {
    console.error('[Auth] Demo login error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// =============================================================================
// POST /auth/logout - Logout user
// =============================================================================
router.post('/logout', authenticate, async (req: Request, res: Response) => {
  try {
    // Invalidate all sessions for user
    await prisma.session.updateMany({
      where: { userId: req.user!.id },
      data: { isValid: false },
    });

    res.clearCookie('token');
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('[Auth] Logout error:', error);
    res.status(500).json({ error: 'Failed to logout' });
  }
});

// =============================================================================
// GET /auth/me - Get current user
// =============================================================================
router.get('/me', authenticate, async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      include: {
        profile: true,
        company: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        emailVerified: user.emailVerified,
        onboardingComplete: user.onboardingComplete,
        profile: user.profile,
        company: user.company,
      },
    });
  } catch (error) {
    console.error('[Auth] Get me error:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

// =============================================================================
// POST /auth/select-role - Select role during onboarding
// =============================================================================
router.post('/select-role', authenticate, async (req: Request, res: Response) => {
  try {
    const { role } = req.body;

    if (!role || !['STUDENT', 'RECRUITER'].includes(role)) {
      return res.status(400).json({ error: 'Valid role is required (STUDENT or RECRUITER)' });
    }

    // Check if role is already assigned
    const currentUser = await prisma.user.findUnique({ where: { id: req.user!.id } });
    
    if (currentUser?.role) {
      return res.status(400).json({ error: 'Role is already assigned and cannot be changed' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        role,
        roleAssignedAt: new Date(),
        authStatus: 'ONBOARDING',
      },
      include: { profile: true },
    });

    res.json({
      success: true,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
        onboardingComplete: updatedUser.onboardingComplete,
      },
    });
  } catch (error) {
    console.error('[Auth] Select role error:', error);
    res.status(500).json({ error: 'Failed to select role' });
  }
});

export default router;
