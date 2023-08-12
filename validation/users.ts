import { Request, Response, NextFunction } from 'express';
import { validationResult, body } from 'express-validator';

export const ValidateRegister = [
  body('fullName').notEmpty().withMessage('fullName is required'),
  body('email').notEmpty().withMessage('Email is required').isEmail(),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
