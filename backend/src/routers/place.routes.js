/* eslint-disable import/no-named-as-default-member */
import express from 'express';
import placeController from '../controllers/place';
import authMiddleWare from '../middleware/auth';

const router = express.Router();

router.get('/', placeController.onReadAll);
router.get('/:id', placeController.onReadOne);
router.put('/:id', authMiddleWare.verifyRequest, placeController.onEditOne);
router.post('/', authMiddleWare.verifyRequest, placeController.onCreateOne);
router.delete(
  '/:id',
  authMiddleWare.verifyRequest,
  placeController.onDeleteOne,
);

export default router;
