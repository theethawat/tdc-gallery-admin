/* eslint-disable import/no-named-as-default-member */
import express from 'express';
import articleController from '../controllers/article';

const router = express.Router();

router.get('/', articleController.onReadAll);
router.get('/:id', articleController.onReadOne);
router.put('/:id', articleController.onEditOne);
router.post('/', articleController.onCreateOne);
router.delete('/:id', articleController.onDeleteOne);

export default router;
