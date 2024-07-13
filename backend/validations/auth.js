import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Invalid email').isEmail(),
  body('password', 'Password must be at least 5 characters').isLength({
    min: 5,
  }),
  body('login', 'Login must be at least 3 characters')
    .isLength({ min: 3 })
    .isString(),
  body('firstName', 'First name must be at least 3 characters').isLength({
    min: 3,
  }),
  body('lastName', 'Second name must be at least 3 characters').isLength({
    min: 3,
  }),
  body('gender', 'Invalid choosen gender. Gender can be: male, female, other')
    .optional()
    .isString()
    .isIn(['male', 'female', 'other']),
  body('avatarUrl', 'Invalid avatar link').optional(),
];

export const loginValidation = [
  body('email', 'Invalid email').isEmail().optional(),
  body('login', 'Invalid login').isLength({ min: 3 }).isString().optional(),
  body('password', 'Invalid password').isLength({
    min: 5,
  }),
];
