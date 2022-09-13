import ordersModel from '../models/orders.model';

const ordersService = {
  getAll: async ():Promise<void> => {
    await ordersModel.getAll();
  },
};

export default ordersService;
