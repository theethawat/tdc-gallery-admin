import express from 'express';
import userRouter from './user';
import place from './place.routes';
import category from './category.routes';
import galleryArticle from './gallery-article.routes';
import image from './image.routes';
import people from './people.routes';

console.log('Load API Route');
const router = express.Router();

router.use('/gallery-article', galleryArticle);
router.use('/user', userRouter);
router.use('/place', place);
router.use('/category', category);
router.use('/image', image);
router.use('/people', people);

/**
 * @deprecated since 2026-05-06
 * Use /gallery-article instead of /article
 */
router.use('/article', galleryArticle);

export default router;
