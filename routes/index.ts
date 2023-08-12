import express, { Router } from 'express';
import FirstVersionRoutes from './v1';

const routes: Router = express.Router();

routes.use('/v1', FirstVersionRoutes);

export default routes;
