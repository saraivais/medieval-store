import productsModel from '../models/products.model';
import Product from '../interfaces/product.interface';

const productsService = {
  getAll: async ():Promise<Product[]> => {
    const allProducts = await productsModel.getAll();
    return allProducts;
  },

  create: async (productToCreate:Product):Promise<Product> => {
    const createdProduct = await productsModel.create(productToCreate);
    return createdProduct;
  },
};

export default productsService;
