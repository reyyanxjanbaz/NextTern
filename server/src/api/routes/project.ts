import { Router } from 'express';
import { projectService } from '../../services/project.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Get all projects for current user
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const projects = await projectService.getProjectsByUserId(req.user!.id);
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

// Create new project
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const project = await projectService.createProject(req.user!.id, req.body);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
});

// Update project
router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const project = await projectService.updateProject(req.user!.id, req.params.id, req.body);
    res.json(project);
  } catch (error) {
    next(error);
  }
});

// Delete project
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    await projectService.deleteProject(req.user!.id, req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
