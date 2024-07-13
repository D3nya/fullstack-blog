import { Router } from 'express';
import { checkAuth, handleValidationErrors } from '../utils/index.js';
import { tagValidation } from '../validations/index.js';
import { TagController } from '../controllers/index.js';

const router = new Router();

router.post(
  '/',
  checkAuth,
  tagValidation,
  handleValidationErrors,
  TagController.addTag
);
router.get('/', TagController.getAllTags);
router.get('/:tag', TagController.getOneTag);

export default router;
