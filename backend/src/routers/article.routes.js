/* eslint-disable import/no-named-as-default-member */
import express from 'express';
import articleController from '../controllers/article';
import authMiddleWare from '../middleware/auth';

const router = express.Router();

router.get('/', articleController.onReadAll);
router.get('/:id', articleController.onReadOne);
router.put('/:id', authMiddleWare.verifyRequest, articleController.onEditOne);
router.post('/', authMiddleWare.verifyRequest, articleController.onCreateOne);
router.delete(
  '/:id',
  authMiddleWare.verifyRequest,
  articleController.onDeleteOne,
);

export default router;
