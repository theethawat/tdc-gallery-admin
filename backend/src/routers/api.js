import express from 'express';
import userRouter from './user';
import place from './place.routes';
import category from './category.routes';
import article from './article.routes';
import image from './image.routes';

console.log('Load API Route');
const router = express.Router();

router.use('/user', userRouter);
router.use('/place', place);
router.use('/category', category);
router.use('/article', article);
router.use('/image', image);

export default router;
