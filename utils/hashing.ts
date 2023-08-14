import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const SALT_KEY = process.env.SALT_KEY;

export function hashPassword(inputPassword: string) {
  const salt = bcrypt.genSaltSync(Number(SALT_KEY));
  return bcrypt.hashSync(inputPassword, salt);
}

export function checkPassword(inputPassword: string, hashingPassword: string) {
  return bcrypt.compareSync(inputPassword, hashingPassword);
}
