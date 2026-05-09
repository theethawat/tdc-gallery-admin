/* eslint-disable import/no-named-as-default-member */
import diaryController from '../controllers/diary-article';
import authMiddleWare from '../middleware/auth';
import { createCrudRouter } from './RouterFactory';

const router = createCrudRouter(diaryController, authMiddleWare, {
  requireAuth: true,
  readAuth: true,
});

export default router;
