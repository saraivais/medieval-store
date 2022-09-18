import { Request, Response, NextFunction } from 'express';
import usersService from '../services/users.service';
import User from '../interfaces/user.interface';

const usersController = {
  create: async (request: Request, response: Response, _next: NextFunction):Promise<Response> => {
    const userToCreate: User = request.body;
    const result = await usersService.create(userToCreate);
    return response.status(201).json(result);
  },

  login: async (request: Request, response: Response, _next: NextFunction):Promise<Response> => {
    const loginInformation: User = request.body;
    const result = await usersService.login(loginInformation);
    return response.status(200).json(result);
  },

};

export default usersController;