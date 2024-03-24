import express from 'express';
import userRouter from './user';
import place from './place.routes';
import category from './category.routes';

console.log('Load API Route');
const router = express.Router();

router.use('/user', userRouter);
router.use('/place', place);
router.use('/category', category);

export default router;
