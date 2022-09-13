import express from 'express';
import ordersController from '../controllers/orders.controller';

const ordersRoute = express.Router();

ordersRoute.get('/', ordersController.getAll);

export default ordersRoute;