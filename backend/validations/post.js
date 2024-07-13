import { body } from 'express-validator';

export const postValidation = [
  body('title', 'Invalid title').isLength({ min: 3 }).isString(),
  body('text', 'Invalid text').isLength({ min: 10 }).isString(),
  body('tags', 'Invalid tags').optional().isString(),
  body('imageUrl', 'Invalid image').optional().isString(),
];
