import Router from 'express';
import { registerValidation, loginValidation } from '../validations/index.js';
import {
  checkAuth,
  checkAuthWithoutRestrict,
  handleValidationErrors,
} from '../utils/index.js';
import { UserController } from '../controllers/index.js';

const router = new Router();

router.post(
  '/register',
  registerValidation,
  handleValidationErrors,
  UserController.register
);

router.post(
  '/login',
  loginValidation,
  handleValidationErrors,
  UserController.login
);

router.get('/me', checkAuth, UserController.getMe);

router.get('/favourites', checkAuth, UserController.getFavourites);
router.post('/favourites', checkAuth, UserController.addFavourite);
router.delete('/favourites', checkAuth, UserController.deleteFavourite);

router.get('/:id', checkAuthWithoutRestrict, UserController.getOneUser);
router.put('/:id', checkAuth, UserController.editUser);

export default router;
