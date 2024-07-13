import { body } from 'express-validator';

export const tagValidation = [
  body('title', 'Invalid tag title')
    .isLength({ min: 2 })
    .isString()
    .toLowerCase()
    .trim()
    .customSanitizer((tag, { req }) => {
      return String(tag.replace('#', ''));
    }),
];
