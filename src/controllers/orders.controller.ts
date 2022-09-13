import { Request, Response, NextFunction } from 'express';
import ordersService from '../services/orders.service';

const ordersController = {
  getAll: async (_request: Request, response: Response, _next: NextFunction):Promise<Response> => {
    const allOrders = await ordersService.getAll();
    return response.status(200).json(allOrders);
  },
};

export default ordersController;