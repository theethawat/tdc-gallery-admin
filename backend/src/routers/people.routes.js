/* eslint-disable import/no-named-as-default-member */
import peopleController from '../controllers/people';
import authMiddleWare from '../middleware/auth';
import { createCrudRouter } from './RouterFactory';

const router = createCrudRouter(peopleController, authMiddleWare, {
  requireAuth: true,
  readAuth: true,
});

export default router;
