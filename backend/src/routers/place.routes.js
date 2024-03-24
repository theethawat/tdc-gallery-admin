/* eslint-disable import/no-named-as-default-member */
import express from 'express';
import placeController from '../controllers/place';

const router = express.Router();

router.get('/', placeController.onReadAll);
router.get('/:id', placeController.onReadOne);
router.put('/:id', placeController.onEditOne);
router.post('/', placeController.onCreateOne);
router.delete('/:id', placeController.onDeleteOne);

export default router;
