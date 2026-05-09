/* eslint-disable import/no-named-as-default-member */
import specialMomentController from '../controllers/special-moment';
import authMiddleWare from '../middleware/auth';
import { createCrudRouter } from './RouterFactory';

const router = createCrudRouter(specialMomentController, authMiddleWare, {
  requireAuth: true,
  readAuth: true,
});

export default router;
