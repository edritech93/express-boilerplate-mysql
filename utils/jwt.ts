import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_KEY = process.env.JWT_KEY;

export function generateToken(payload: object, expired: string = '7d') {
  return jwt.sign(payload, JWT_KEY as string, {
    expiresIn: expired
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_KEY as string);
}
