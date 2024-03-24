/* eslint-disable import/no-named-as-default-member */
import express from 'express';
import imageController from '../controllers/image';

const router = express.Router();

router.get('/', imageController.onReadAll);
router.get('/:id', imageController.onReadOne);
router.put('/:id', imageController.onEditOne);
router.post('/', imageController.onCreateOne);
router.delete('/:id', imageController.onDeleteOne);

export default router;
