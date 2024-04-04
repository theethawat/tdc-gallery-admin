/* eslint-disable import/no-named-as-default-member */
import express from 'express';
import categoryController from '../controllers/category';
import authMiddleWare from '../middleware/auth';

const router = express.Router();

router.get('/', categoryController.onReadAll);
router.get('/:id', categoryController.onReadOne);
router.put('/:id', authMiddleWare.verifyRequest, categoryController.onEditOne);
router.post('/', authMiddleWare.verifyRequest, categoryController.onCreateOne);
router.delete(
  '/:id',
  authMiddleWare.verifyRequest,
  categoryController.onDeleteOne,
);

export default router;
