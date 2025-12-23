import { Router } from 'express';
import { interestService } from '../../services/interest';
import { swipeLimiter } from '../../services/swipe-limiter';
import { requireAuth, requireRole } from '../middleware/auth';

const router = Router();

// Record a swipe (interest or pass)
router.post('/swipe', requireAuth, requireRole(['student']), async (req, res, next) => {
  try {
    const { internshipId, action } = req.body;
    
    if (!internshipId || !['interested', 'pass'].includes(action)) {
      return res.status(400).json({ message: 'Invalid swipe data' });
    }

    const result = await interestService.recordSwipe(req.user!.id, internshipId, action);
    res.json(result);
  } catch (error: any) {
    if (error.message === 'Daily swipe limit reached') {
      return res.status(429).json({ message: 'Daily swipe limit reached' });
    }
    next(error);
  }
});

// Get daily swipe limit status
router.get('/limit', requireAuth, requireRole(['student']), async (req, res, next) => {
  try {
    const status = await swipeLimiter.hasReachedLimit(req.user!.id);
    res.json(status);
  } catch (error) {
    next(error);
  }
});

// Get list of interested internships
router.get('/interested', requireAuth, requireRole(['student']), async (req, res, next) => {
  try {
    const interested = await interestService.getInterestedInternships(req.user!.id);
    res.json(interested);
  } catch (error) {
    next(error);
  }
});

// Get discoverable internships
router.get('/discover', requireAuth, requireRole(['student']), async (req, res, next) => {
  try {
    const internships = await interestService.getDiscoverableInternships(req.user!.id);
    res.json(internships);
  } catch (error) {
    next(error);
  }
});

export default router;
