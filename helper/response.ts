import { Response } from 'express';

export function response(
  res: Response,
  data: object,
  message: string,
  code: number = 200
) {
  return res.status(code).json({
    data: data || {},
    message: message || ''
  });
}
