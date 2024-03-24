/* eslint-disable import/no-named-as-default-member */
import express from 'express';
import categoryController from '../controllers/category';

const router = express.Router();

router.get('/', categoryController.onReadAll);
router.get('/:id', categoryController.onReadOne);
router.put('/:id', categoryController.onEditOne);
router.post('/', categoryController.onCreateOne);
router.delete('/:id', categoryController.onDeleteOne);

export default router;
