import { Request, Response, NextFunction } from 'express';
import productsService from '../services/products.service';
import Product from '../interfaces/product.interface';

const productsController = {
  getAll: async (_request: Request, response: Response, _next: NextFunction):Promise<Response> => {
    const allProducts = await productsService.getAll();
    return response.status(200).json(allProducts);
  },

  create: async (request: Request, response: Response, _next: NextFunction):Promise<Response> => {
    const productToCreate: Product = request.body;
    const createdProduct = await productsService.create(productToCreate);
    return response.status(201).json(createdProduct);
  },
};

export default productsController;
