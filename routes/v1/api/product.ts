import express, { Router } from 'express';
import {
  getProduct,
  getProductUser,
  addProduct,
  editProduct,
  deleteProduct
} from '../../../modules/product/api.controller';

const routes: Router = express.Router();

routes.get('/', getProduct);
routes.get('/me', getProductUser);
routes.post('/', addProduct);
routes.put('/', editProduct);
routes.delete('/', deleteProduct);

export default routes;
