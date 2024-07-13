import Router from 'express';
import { upload } from '../utils/index.js';
import { UploadsController } from '../controllers/index.js';

const router = new Router();

router.post('/', upload.single('image'), UploadsController.uploads);

export default router;
