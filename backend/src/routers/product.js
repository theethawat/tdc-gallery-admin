/* eslint-disable import/no-named-as-default-member */
import express from 'express';
import productController from '../controllers/product';

const router = express.Router();

console.log('In Product Router');

router.get('/', productController.onReadAll);
router.get('/:id', productController.onReadOne);
router.put('/:id', productController.onEditOne);
router.post('/', productController.onCreateOne);
router.delete('/:id', productController.onDeleteOne);

export default router;
