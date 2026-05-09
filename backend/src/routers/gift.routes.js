/* eslint-disable import/no-named-as-default-member */
import giftController from '../controllers/gift';
import authMiddleWare from '../middleware/auth';
import { createCrudRouter } from './RouterFactory';

const router = createCrudRouter(giftController, authMiddleWare, {
  requireAuth: true,
  readAuth: true,
});

export default router;
