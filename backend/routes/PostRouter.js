import Router from 'express';
import { postValidation } from '../validations/index.js';
import { checkAuth, handleValidationErrors } from '../utils/index.js';
import { PostController } from '../controllers/index.js';

const router = new Router();

router.post(
  '/',
  checkAuth,
  postValidation,
  handleValidationErrors,
  PostController.createPost
);
router.get('/', PostController.getAllPosts);
router.get('/titles', PostController.getAllTitles);
router.get('/:id', PostController.getOnePost);
router.put(
  '/:id',
  checkAuth,
  postValidation,
  handleValidationErrors,
  PostController.updatePost
);
router.delete('/:id', checkAuth, PostController.deletePost);

export default router;
