import { Request, Response, NextFunction } from 'express';
import ordersService from '../services/orders.service';
import Token from '../interfaces/token.interface';
import Order from '../interfaces/order.interface';

const ordersController = {
  getAll: async (_request: Request, response: Response, _next: NextFunction):Promise<Response> => {
    const allOrders = await ordersService.getAll();
    return response.status(200).json(allOrders);
  },

  create: async (request: Request, response: Response, _next: NextFunction) => {
    const jwtToken = {
      token: request.headers.authorization,
    };
    const productsToInsert:Order = request.body;    
    const result = await ordersService.create(jwtToken as Token, productsToInsert);
    return response.status(201).json(result);
  },
};

export default ordersController;