import { Router } from 'express';
import { checkAuth, handleValidationErrors } from '../utils/index.js';
import { commentValidation } from '../validations/index.js';
import { CommentController } from '../controllers/index.js';

const router = new Router();

router.post(
  '/',
  checkAuth,
  commentValidation,
  handleValidationErrors,
  CommentController.createComment
);
router.get('/', CommentController.getAllComments);
router.get('/:id', CommentController.getOneComment);
router.put(
  '/:id',
  checkAuth,
  commentValidation,
  handleValidationErrors,
  CommentController.updateComment
);
router.delete('/:id', checkAuth, CommentController.deleteComment);

export default router;
