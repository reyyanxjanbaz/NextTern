import { Router } from 'express';
import { shortlistService } from '../../services/shortlist.js';
import { authenticate } from '../middleware/auth.js';
import { requireRole } from '../middleware/role-guard.js';
import { UserRole } from '@nexttern/shared';

const router = Router();

// Shortlist or pass a candidate
router.post('/', authenticate, requireRole([UserRole.RECRUITER]), async (req, res) => {
  try {
    const { candidateId, internshipId, action } = req.body;
    const recruiterId = req.user!.id;

    if (!candidateId || !internshipId || !action) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let result;
    if (action === 'shortlist') {
      result = await shortlistService.shortlistCandidate(recruiterId, internshipId, candidateId);
    } else if (action === 'pass') {
      result = await shortlistService.passCandidate(recruiterId, internshipId, candidateId);
    } else {
      return res.status(400).json({ error: 'Invalid action' });
    }

    res.json(result);
  } catch (error) {
    console.error('Shortlist error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get shortlisted candidates for an internship
router.get('/:internshipId', authenticate, requireRole([UserRole.RECRUITER]), async (req, res) => {
  try {
    const { internshipId } = req.params;
    const candidates = await shortlistService.getShortlistedCandidates(internshipId);
    res.json(candidates);
  } catch (error) {
    console.error('Get shortlist error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
