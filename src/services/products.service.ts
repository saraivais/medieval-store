import Joi from 'joi';
import productsModel from '../models/products.model';
import Product from '../interfaces/product.interface';

const productsService = {
  getAll: async ():Promise<Product[]> => {
    const allProducts = await productsModel.getAll();
    return allProducts;
  },

  create: async (productToCreate:Product):Promise<Product> => {
    const { error } = productsService.validateProductData.validate(productToCreate);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const createdProduct = await productsModel.create(productToCreate);
    return createdProduct;
  },

  validateProductData: Joi.object({
    name: Joi.string().required().min(3).messages({
      'any.required': '400|"name" is required',
      'string.base': '422|"name" must be a string',
      'string.min': '422|"name" length must be at least 3 characters long',
    }),
    amount: Joi.string().required().min(3).messages({
      'any.required': '400|"amount" is required',
      'string.base': '422|"amount" must be a string',
      'string.min': '422|"amount" length must be at least 3 characters long',
    }),
  }),
};

export default productsService;
