/* eslint-disable import/no-named-as-default-member */
import articleController from '../controllers/gallery-article';
import authMiddleWare from '../middleware/auth';
import { createCrudRouter } from './RouterFactory';

const router = createCrudRouter(articleController, authMiddleWare, {
  requireAuth: false,
  readAuth: false,
});

export default router;
