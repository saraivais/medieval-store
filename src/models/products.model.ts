import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import connection from './connection';
import Product from '../interfaces/product.interface';

interface ProductDataPacket extends Product, RowDataPacket{}

const productsModel = {
  getAll: async ():Promise<ProductDataPacket[]> => {
    const query = 'SELECT * FROM Trybesmith.Products';
    const [allProducts] = await connection.execute<ProductDataPacket[]>(query);
    return allProducts;
  },

  create: async ({ name, amount }:Product):Promise<Product> => {
    const query = 'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?);';
    const [{ insertId }] = await connection.execute<ResultSetHeader>(query, [name, amount]);
    return { id: insertId, name, amount };
  },

  editOrder: async ({ id, orderId }:Product):Promise<void> => {
    const query = 'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?';
    await connection.execute<ResultSetHeader>(query, [orderId, id]);
  },
};

export default productsModel;
