import { ResultSetHeader } from 'mysql2/promise';
import connection from './connection';
import User from '../interfaces/user.interface';

const usersModel = {
  create: async ({ username, classe, level, password }:User):Promise<void> => {
    const query = `INSERT INTO Trybesmith.Users 
    (username, classe, level, password) VALUES (?, ?, ?, ?);`;
    await connection.execute<ResultSetHeader>(query, [username, classe, level, password]);
  },
};

export default usersModel;
