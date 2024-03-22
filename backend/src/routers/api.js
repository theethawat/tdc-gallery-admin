import express from 'express';
import userRouter from './user';
import productRouter from './product';
import shoppingListRouter from './shoppinglist';

console.log('Load API Route');
const router = express.Router();

router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/shopping-list', shoppingListRouter);

export default router;
