import express from 'express';
import ordersController from '../controllers/orders.controller';
import jwtValidation from '../middlewares/jwtValidation';

const ordersRoute = express.Router();

ordersRoute.get('/', ordersController.getAll);
ordersRoute.post('/', jwtValidation, ordersController.create);

export default ordersRoute;