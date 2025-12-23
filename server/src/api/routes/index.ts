/**
 * API Router Index
 * 
 * Central hub for all API routes.
 * Versions the API and mounts feature-specific routers.
 */

import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';

// Import feature routers (placeholders for now)
// import authRoutes from './auth.routes.js';
// import userRoutes from './user.routes.js';
// import studentRoutes from './student.routes.js';
// import recruiterRoutes from './recruiter.routes.js';
// import chatRoutes from './chat.routes.js';

const router = Router();

// =============================================================================
// PUBLIC ROUTES
// =============================================================================

// Health check (duplicate of root health check for API consistency)
router.get('/health', (req, res) => {
  res.json({ status: 'ok', version: 'v1' });
});

// Auth routes (login, register, magic link)
// router.use('/auth', authRoutes);

// =============================================================================
// PROTECTED ROUTES (Global Auth Guard)
// =============================================================================

// All routes below this line require authentication
router.use(authenticate);

// User management (profile, settings)
// router.use('/users', userRoutes);

// Student-specific features (discovery, applications)
// router.use('/student', studentRoutes);

// Recruiter-specific features (posting, pipeline)
// router.use('/recruiter', recruiterRoutes);

// Chat and messaging
// router.use('/chat', chatRoutes);

export default router;
