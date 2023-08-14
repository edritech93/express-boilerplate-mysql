import express, { Router } from 'express';
import { editUser, getUser } from '../../../modules/user/api.controller';

const routes: Router = express.Router();

routes.get('/', getUser);
routes.put('/', editUser);

export default routes;
