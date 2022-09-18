import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import connection from './connection';
import Order from '../interfaces/order.interface';

interface OrderDataPacket extends Order, RowDataPacket{}

const ordersModel = {
  getAll: async ():Promise<OrderDataPacket[]> => {
    const query = `SELECT ord.id AS id, ord.userId AS userId, JSON_ARRAYAGG(prod.id) AS productsIds
    FROM Trybesmith.Orders as ord
    INNER JOIN Trybesmith.Products as prod
    ON ord.id = prod.orderId
    GROUP BY ord.id
    ORDER BY ord.userId ASC;`;

    const [allOrders] = await connection.execute<OrderDataPacket[]>(query);
    console.log(allOrders);
    return allOrders;
  },

  create: async (userId: number):Promise<number> => {
    const query = 'INSERT INTO Trybesmith.Orders (userId) VALUES (?);';
    const [result] = await connection.execute<ResultSetHeader>(query, [userId]);
    return result.insertId;
  },
};

export default ordersModel;
