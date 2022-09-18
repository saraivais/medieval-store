import dotenv from 'dotenv';
import jwt, { SignOptions } from 'jsonwebtoken';
import usersModel from '../models/users.model';
import User from '../interfaces/user.interface';
import Token from '../interfaces/token.interface';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET || 'Unbowed, Unbent, Unbroken';

const usersService = {
  create: async (userToCreate:User):Promise<Token> => {
    const createdId = await usersModel.create(userToCreate);
    const token = usersService.generateToken(userToCreate.username, createdId);

    return { token };
  },

  generateToken: (username:string, id: number):string => {
    const jwtConfig:SignOptions = {
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: { username, id } }, jwtSecret, jwtConfig);
    return token;
  },

  validateLoginData: Joi.object({
    username: Joi.string().required().empty('').messages({
      'any.required': '400|"username" is required',
      'string.empty': '400|"username" is required',
    }),
    password: Joi.string().required().empty('').messages({
      'any.required': '400|"password" is required',
      'string.empty': '400|"password" is required',
    }),
  }),
};

export default usersService;