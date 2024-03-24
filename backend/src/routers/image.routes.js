/* eslint-disable import/no-named-as-default-member */
import express from 'express';
import multer from 'multer';
import imageController from '../controllers/image';
import config from '../configs/app';

const router = express.Router();
const storage = multer.memoryStorage();

const fileFilter = function fileFilter(req, _file, cb) {
  const fileSize = parseInt(req.headers['content-length'], 10);
  console.log('file size', fileSize);
  if (fileSize > config.maxUploadFileSize) {
    return cb(new Error('contents larger limit'));
  }
  cb(null, true);
};

const limits = {
  limits: {
    fileSize: config.maxUploadFileSize,
  },
};

const upload = multer({ storage, fileFilter, limits });

router.get('/', imageController.onReadAll);
router.get('/:id', imageController.onReadOne);
router.put('/:id', imageController.onEditOne);
router.post('/', imageController.onCreateOne);
router.delete('/:id', imageController.onDeleteOne);
router.post('/upload', upload.single('files'), imageController.onUploadFile);

export default router;
