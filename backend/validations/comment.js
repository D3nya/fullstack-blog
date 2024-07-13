import { body } from 'express-validator';

export const commentValidation = [
  body('text', 'Invalid text').isLength({ min: 3 }).isString(),
  body('rating', 'Invalid rating').isInt({ min: 0, max: 5 }),
];
