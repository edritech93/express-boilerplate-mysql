import express, { Router } from 'express';
import { editUser, getUser } from '../../../controllers/userController';

const routes: Router = express.Router();

routes.get('/', getUser);
routes.put('/', editUser);

export default routes;
