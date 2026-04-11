/* eslint-disable import/no-named-as-default-member */
import express from 'express';
import peopleController from '../controllers/people';
import authMiddleWare from '../middleware/auth';

const router = express.Router();

router.get('/', authMiddleWare.verifyRequest, peopleController.onReadAll);
router.get('/:id', authMiddleWare.verifyRequest, peopleController.onReadOne);
router.put('/:id', authMiddleWare.verifyRequest, peopleController.onEditOne);
router.post('/', authMiddleWare.verifyRequest, peopleController.onCreateOne);
router.delete(
  '/:id',
  authMiddleWare.verifyRequest,
  peopleController.onDeleteOne,
);

export default router;
