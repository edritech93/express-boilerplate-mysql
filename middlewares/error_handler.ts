/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { ErrorType } from '../types/ErrorType';

export default function errorHandler(
  error: ErrorType,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { status = 500, message = 'Internal Server Error' } = error;
  let statusCode: number;
  const errorMessage = [];

  switch (error.type) {
    case 'jwt':
      statusCode = 401;
      errorMessage.push('Token invalid');
      break;

    default:
      statusCode = status;
      errorMessage.push(message);
      break;
  }

  res.status(statusCode).json({
    success: false,
    message: errorMessage.toString()
  });
}
