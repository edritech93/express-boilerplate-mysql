import express, { Router } from 'express';
import { ValidateRegister } from '../../../validation/users';
import AuthenticationApiController from '../../../modules/auth/api.controller';

const routes: Router = express.Router();

routes.post(
  `/register`,
  ValidateRegister,
  AuthenticationApiController.register
);
routes.post(`/login`, AuthenticationApiController.login);

export default routes;
