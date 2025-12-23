import { Router } from 'express';
import { resumeParserService } from '../../services/resume-parser.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Mock file upload middleware since we can't install multer right now
const uploadMiddleware = (req: any, res: any, next: any) => {
  // In a real app, use multer or similar
  // For now, we assume the file content might be in req.body or we just mock it
  next();
};

router.post('/parse', requireAuth, uploadMiddleware, async (req, res, next) => {
  try {
    // In a real implementation, we'd pass the file buffer/path to the service
    // const file = req.file;
    
    // Mocking the file input for now
    const parsedData = await resumeParserService.parseResume(Buffer.from('mock-pdf-content'));
    
    res.json(parsedData);
  } catch (error) {
    next(error);
  }
});

export default router;
