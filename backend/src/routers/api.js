import express from 'express';
import userRouter from './user';
import place from './place.routes';
import category from './category.routes';
import galleryArticle from './gallery-article.routes';
import image from './image.routes';
import people from './people.routes';
import diaryArticle from './diary-article.routes';
import specialMoment from './special-moment.routes';
import lesson from './lesson.routes';
import gift from './gift.routes';

console.log('Load API Route');
const router = express.Router();

router.use('/gallery-article', galleryArticle);
router.use('/user', userRouter);
router.use('/place', place);
router.use('/category', category);
router.use('/image', image);
router.use('/people', people);
router.use('/diary-article', diaryArticle);
router.use('/special-moment', specialMoment);
router.use('/lesson', lesson);
router.use('/gift', gift);

/**
 * @deprecated since 2026-05-06
 * Use /gallery-article instead of /article
 */
router.use('/article', galleryArticle);

export default router;
