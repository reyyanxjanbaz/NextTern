/**
 * API Router Index
 * 
 * Central hub for all API routes.
 * Versions the API and mounts feature-specific routers.
 */

import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import authRoutes from './auth.js';
import shortlistRoutes from './shortlist.js';
import interestRoutes from './interest.js';
import matchRoutes from './match.js';
import chatRoutes from './chat.js';
import pipelineRoutes from './pipeline.js';

const router = Router();

// =============================================================================
// PUBLIC ROUTES
// =============================================================================

// Health check (duplicate of root health check for API consistency)
router.get('/health', (req, res) => {
  res.json({ status: 'ok', version: 'v1' });
});

// Auth routes (login, register, magic link) - PUBLIC
router.use('/auth', authRoutes);

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
router.use('/shortlist', shortlistRoutes);
router.use('/interest', interestRoutes);
router.use('/matches', matchRoutes);
router.use('/chat', chatRoutes);
router.use('/pipeline', pipelineRoutes);

export default router;
