/* eslint-disable import/no-named-as-default-member */
import multer from 'multer';
import imageController from '../controllers/image';
import config from '../configs/app';
import authMiddleWare from '../middleware/auth';
import { createCrudRouter } from './RouterFactory';
import BaseRouter from './BaseRouter';

// Configure multer for file uploads
const storage = multer.memoryStorage();

const fileFilter = (req, _file, cb) => {
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

// Setup base CRUD routes
const baseRouter = new BaseRouter(imageController, {
  requireAuth: false,
  readAuth: false,
});

const router = baseRouter.setupRoutes(authMiddleWare);

// Add custom upload route
router.post(
  '/upload',
  authMiddleWare.verifyRequest,
  upload.single('files'),
  imageController.onUploadFile,
);

export default router;
