import express, { Router } from 'express';
import ApiRoutes from './api';

const routes: Router = express.Router();

routes.use(ApiRoutes);

export default routes;
