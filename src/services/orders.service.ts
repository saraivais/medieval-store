import Joi from 'joi';
import jwt, { JwtPayload } from 'jsonwebtoken';
import ordersModel from '../models/orders.model';
import Order from '../interfaces/order.interface';
import Token from '../interfaces/token.interface';
// import Product from '../interfaces/product.interface';
import productsModel from '../models/products.model';

const ordersService = {
  getAll: async ():Promise<Order[]> => {
    const allOrders = await ordersModel.getAll();
    return allOrders;
  },

  create: async (token: Token, productsToInsert:Order):Promise<Order> => {
    const { error } = ordersService.validateOrderData.validate(productsToInsert);
    if (error) {
      throw new Error(error.details[0].message);
    } 
    const { data } = ordersService.getUserId(token.token);

    const orderId = await ordersModel.create(data.id);

    await Promise.all(productsToInsert.productsIds
      .map((id) => productsModel.editOrder({ id, orderId })));

    return {
      userId: data.id,
      productsIds: productsToInsert.productsIds,
    };
  },

  getUserId: (token:string):JwtPayload => {
    const decodedPayload = jwt.decode(token);
    return decodedPayload as JwtPayload;
  },

  validateOrderData: Joi.object({
    productsIds: Joi.array().required().min(1).items(Joi.number().messages({
      'number.base': '422|"productsIds" must include only numbers',
    }))
      .messages({
        'any.required': '400|"productsIds" is required',
        'array.base': '422|"productsIds" must be an array',
        'array.min': '422|"productsIds" must include only numbers',
      }),
  }),
};

export default ordersService;
