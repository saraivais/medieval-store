import { RowDataPacket } from 'mysql2/promise';
import connection from './connection';
import Product from '../interfaces/product.interface';

interface ProductDataPacket extends Product, RowDataPacket{}

const productsModel = {
  getAll: async ():Promise<ProductDataPacket[]> => {
    const query = 'SELECT * FROM Trybesmith.Products';
    const [allProducts] = await connection.execute<ProductDataPacket[]>(query);
    return allProducts;
  },
};

export default productsModel;
