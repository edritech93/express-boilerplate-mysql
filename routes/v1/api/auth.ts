import express, { Router } from 'express';
import { ValidateRegister } from '../../../validation/users';
import { login, register } from '../../../controllers/authController';

const routes: Router = express.Router();

routes.post('/register', ValidateRegister, register);
routes.post('/login', login);

export default routes;
