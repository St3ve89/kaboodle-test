import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const eventValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('date').isISO8601().withMessage('Date must be a valid ISO8601 date'),
  body('description').notEmpty().withMessage('Description is required'),
  body('tickets.*.name').notEmpty().withMessage('Ticket name is required'),
  body('tickets.*.type')
    .isIn(['adult', 'family', 'child'])
    .withMessage('Invalid ticket type'),
  body('tickets.*.price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('tickets.*.bookingFee')
    .isFloat({ min: 0 })
    .withMessage('Booking fee must be a positive number'),
  body('tickets.*.availability')
    .isIn(['available', 'sold out'])
    .withMessage('Invalid availability status'),
];

export function validate(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  res.status(400).json({ errors: errors.array() });
}
