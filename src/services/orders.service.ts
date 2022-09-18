import Joi from 'joi';
import ordersModel from '../models/orders.model';
import Order from '../interfaces/order.interface';

const ordersService = {
  getAll: async ():Promise<Order[]> => {
    const allOrders = await ordersModel.getAll();
    return allOrders;
  },

  create: async () => {},

  validateOrderData: Joi.object({
    productsIds: Joi.array().required().items(Joi.number().messages({
      'number.base': '422|"productsIds" must include only numbers',
    })).messages({
      'any.required': '400|"productsIds" is required',
      'array.base': '422|"productsIds" must be an array',
    }),
  }),
};

export default ordersService;
