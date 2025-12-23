import jwt from 'jsonwebtoken';
import { prisma } from '../../db/client.js';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key';
const MAGIC_LINK_EXPIRY = '15m';

interface MagicLinkPayload {
  email: string;
  role?: 'STUDENT' | 'RECRUITER';
  type: 'magic-link';
}

export const magicLinkService = {
  /**
   * Generate a magic link token for the given email
   */
  generateToken: (email: string, role?: 'STUDENT' | 'RECRUITER'): string => {
    const payload: MagicLinkPayload = { email, role, type: 'magic-link' };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: MAGIC_LINK_EXPIRY });
  },

  /**
   * Send magic link to email (Mock implementation)
   */
  sendMagicLink: async (email: string, token: string): Promise<void> => {
    const link = `${process.env.APP_URL || 'http://localhost:5173'}/verify?token=${token}`;
    console.log(`[MagicLink] Sending link to ${email}: ${link}`);
    // In production, use an email service like SendGrid or AWS SES
  },

  /**
   * Verify magic link token and return payload
   */
  verifyToken: (token: string): MagicLinkPayload => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as MagicLinkPayload;
      if (decoded.type !== 'magic-link') {
        throw new Error('Invalid token type');
      }
      return decoded;
    } catch (error) {
      throw new Error('Invalid or expired magic link');
    }
  },

  /**
   * Login or register user from magic link
   */
  authenticateUser: async (email: string, role?: 'STUDENT' | 'RECRUITER') => {
    // Find or create user
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // Create new user if not exists
      user = await prisma.user.create({
        data: {
          email,
          role: role || 'STUDENT', // Default to student if not specified
        },
      });
    }

    // Generate session token (long lived)
    const sessionToken = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return { user, token: sessionToken };
  }
};
