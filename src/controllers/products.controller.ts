import { Request, Response, NextFunction } from 'express';
import productsService from '../services/products.service';

const productsController = {
  getAll: async (_request: Request, response: Response, _next: NextFunction):Promise<Response> => {
    const allProducts = await productsService.getAll();
    return response.status(200).json(allProducts);
  },
};

export default productsController;
