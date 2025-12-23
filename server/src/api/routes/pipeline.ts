import { Router } from 'express';
import { pipelineService } from '../../services/pipeline.js';
import { AppError } from '../middleware/error.js';
import { ApplicationState } from '../../../../shared/types/application-state.js';

const router = Router();

// Get pipeline data
router.get('/', async (req, res, next) => {
  try {
    const recruiterId = req.user!.id;
    const { internshipId } = req.query;

    const pipeline = await pipelineService.getPipeline(
      recruiterId,
      internshipId as string
    );

    res.json({
      status: 'success',
      data: pipeline
    });
  } catch (error) {
    next(error);
  }
});

// Move candidate
router.post('/move', async (req, res, next) => {
  try {
    const recruiterId = req.user!.id;
    const { applicationId, newState, note, reason } = req.body;

    if (!applicationId || !newState) {
      throw new AppError('Application ID and new state are required', 400);
    }

    // Validate state
    if (!Object.values(ApplicationState).includes(newState)) {
      throw new AppError('Invalid application state', 400);
    }

    const result = await pipelineService.moveCandidate(
      applicationId,
      newState,
      recruiterId,
      note,
      reason
    );

    res.json({
      status: 'success',
      data: result
    });
  } catch (error) {
    next(error);
  }
});

export default router;
