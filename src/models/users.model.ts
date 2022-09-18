import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import connection from './connection';
import User from '../interfaces/user.interface';

interface UserDataPacket extends User, RowDataPacket{}

const usersModel = {
  create: async ({ username, classe, level, password }:User):Promise<number> => {
    const query = `INSERT INTO Trybesmith.Users 
    (username, classe, level, password) VALUES (?, ?, ?, ?);`;
    const [{ insertId }] = await
    connection.execute<ResultSetHeader>(query, [username, classe, level, password]);
    return insertId;
  },

  getId: async (username:string, password:string):Promise<UserDataPacket[]> => {
    const query = `SELECT id FROM Trybesmith.Users
    WHERE username = ? AND password = ?;`;
    const [result] = await connection.execute<UserDataPacket[]>(query, [username, password]);
    return result;
  },

};

export default usersModel;
