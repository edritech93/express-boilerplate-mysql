import dotenv from 'dotenv';
import { Dialect } from 'sequelize';

dotenv.config();

export const dbConfig = {
  HOST: process.env.DATABASE_HOST || '',
  USER: process.env.DATABASE_USERNAME || '',
  PASSWORD: process.env.DATABASE_PASSWORD || '',
  DB: process.env.DATABASE_NAME || '',
  dialect: 'mysql' as Dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
