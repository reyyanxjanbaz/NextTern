import { Router } from 'express';
import { prisma } from '../../db/client.js';
import { authenticate } from '../middleware/auth.js';
import { matchAlgorithm } from '../../services/matching/match-algorithm.js';

const router = Router();

// Get match explanation
router.get('/explain/:internshipId', authenticate, async (req, res) => {
  try {
    const userId = req.user!.id;
    const { internshipId } = req.params;

    const result = await matchAlgorithm.evaluate(userId, internshipId);

    res.json({
      status: 'success',
      data: result
    });
  } catch (error) {
    console.error('Match explanation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all matches for the current user
router.get('/', authenticate, async (req, res) => {
  try {
    const userId = req.user!.id;
    const role = req.user!.role;

    let matches;

    if (role === 'STUDENT') {
      const profile = await prisma.profile.findUnique({ where: { userId } });
      if (!profile) return res.status(404).json({ error: 'Profile not found' });

      matches = await prisma.match.findMany({
        where: {
          profileId: profile.id,
          isMatched: true
        },
        include: {
          internship: {
            include: {
              company: true
            }
          },
          chat: true
        }
      });
    } else if (role === 'RECRUITER') {
      // Find internships owned by recruiter
      const internships = await prisma.internship.findMany({
        where: { recruiterId: userId },
        select: { id: true }
      });
      const internshipIds = internships.map(i => i.id);

      matches = await prisma.match.findMany({
        where: {
          internshipId: { in: internshipIds },
          isMatched: true
        },
        include: {
          profile: true,
          internship: true,
          chat: true
        }
      });
    } else {
      return res.status(403).json({ error: 'Invalid role' });
    }

    res.json(matches);
  } catch (error) {
    console.error('Get matches error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
