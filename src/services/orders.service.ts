import ordersModel from '../models/orders.model';
import Order from '../interfaces/order.interface';

const ordersService = {
  getAll: async ():Promise<Order[]> => {
    const allOrders = await ordersModel.getAll();
    return allOrders;
  },
};

export default ordersService;
