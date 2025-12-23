import { Router } from 'express';
import { profileService } from '../../services/profile.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Get current user's profile
router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const profile = await profileService.getProfileByUserId(req.user!.id);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    next(error);
  }
});

// Update current user's profile
router.put('/me', requireAuth, async (req, res, next) => {
  try {
    const profile = await profileService.updateProfile(req.user!.id, req.body);
    res.json(profile);
  } catch (error) {
    next(error);
  }
});

// Update skills
router.put('/me/skills', requireAuth, async (req, res, next) => {
  try {
    const profile = await profileService.updateSkills(req.user!.id, req.body.skills);
    res.json(profile);
  } catch (error) {
    next(error);
  }
});

export default router;
