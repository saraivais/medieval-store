import express from 'express';
import productsController from '../controllers/products.controller';

const productsRoute = express.Router();

productsRoute.get('/', productsController.getAll);

export default productsRoute;
