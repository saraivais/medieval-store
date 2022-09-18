import dotenv from 'dotenv';
import jwt, { SignOptions } from 'jsonwebtoken';
import Joi from 'joi';
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

  generateToken: (username: string, id: number):string => {
    const jwtConfig:SignOptions = {
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: { username, id } }, jwtSecret, jwtConfig);
    return token;
  },

  validateLoginData: Joi.object({
    username: Joi.string().required().messages({
      'any.required': '400|"username" is required',
    }),
    password: Joi.string().required().messages({
      'any.required': '400|"password" is required',
    }),
  }),
  
  login: async (loginInformation:User):Promise<Token> => {
    const { error } = usersService.validateLoginData.validate(loginInformation);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const [user] = await usersModel.getId(loginInformation.username, loginInformation.password);

    if (!user) {
      throw new Error('401|Username or password invalid');
    }
    const { id } = user;
    const token = usersService.generateToken(loginInformation.username, id as number);

    return { token };
  },
};

export default usersService;