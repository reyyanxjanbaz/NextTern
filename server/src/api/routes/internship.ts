import { Router } from 'express';
import { internshipService } from '../../services/internship';
import { requireAuth, requireRole } from '../middleware/auth';

const router = Router();

// Create internship
router.post('/', requireAuth, requireRole(['recruiter']), async (req, res, next) => {
  try {
    const internship = await internshipService.createInternship(req.user!.id, req.body);
    res.status(201).json(internship);
  } catch (error) {
    next(error);
  }
});

// Get all internships for current recruiter
router.get('/my-internships', requireAuth, requireRole(['recruiter']), async (req, res, next) => {
  try {
    const internships = await internshipService.getRecruiterInternships(req.user!.id);
    res.json(internships);
  } catch (error) {
    next(error);
  }
});

// Get internship by ID
router.get('/:id', requireAuth, async (req, res, next) => {
  try {
    const internship = await internshipService.getInternship(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }
    res.json(internship);
  } catch (error) {
    next(error);
  }
});

// Update internship
router.put('/:id', requireAuth, requireRole(['recruiter']), async (req, res, next) => {
  try {
    // TODO: Check ownership
    const internship = await internshipService.updateInternship(req.params.id, req.body);
    res.json(internship);
  } catch (error) {
    next(error);
  }
});

// Delete internship
router.delete('/:id', requireAuth, requireRole(['recruiter']), async (req, res, next) => {
  try {
    // TODO: Check ownership
    await internshipService.deleteInternship(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
