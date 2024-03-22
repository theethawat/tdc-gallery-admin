/* eslint-disable import/no-named-as-default-member */
import express from 'express';
import shoppingListController from '../controllers/shoppinglist';

const router = express.Router();

console.log('In Shopping List Router');

router.get('/', shoppingListController.onReadAll);
router.get('/:id', shoppingListController.onReadOne);
router.put('/:id', shoppingListController.onEditOne);
router.post('/', shoppingListController.onCreateOne);
router.delete('/:id', shoppingListController.onDeleteOne);

export default router;
