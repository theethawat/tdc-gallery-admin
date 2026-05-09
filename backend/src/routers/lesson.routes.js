/* eslint-disable import/no-named-as-default-member */
import lessonController from '../controllers/lesson';
import authMiddleWare from '../middleware/auth';
import { createCrudRouter } from './RouterFactory';

const router = createCrudRouter(lessonController, authMiddleWare, {
  requireAuth: true,
  readAuth: true,
});

export default router;
