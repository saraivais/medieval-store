import productsModel from '../models/products.model';
import Product from '../interfaces/product.interface';

const productsService = {
  getAll: async ():Promise<Product[]> => {
    const allProducts = await productsModel.getAll();
    return allProducts;
  },
};

export default productsService;
