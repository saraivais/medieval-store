import dotenv from 'dotenv';
import jwt, { SignOptions } from 'jsonwebtoken';
import Joi from 'joi';
import usersModel from '../models/users.model';
import User from '../interfaces/user.interface';
import Token from '../interfaces/token.interface';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET || 'Unbowed, Unbent, Unbroken';

const usersService = {
  validateUserData: Joi.object({
    username: Joi.string().required().min(3).messages({
      'any.required': '400|"username" is required',
      'string.base': '422|"username" must be a string',
      'string.min': '422|"username" length must be at least 3 characters long',
    }),
    classe: Joi.string().required().min(3).messages({
      'any.required': '400|"classe" is required',
      'string.base': '422|"classe" must be a string',
      'string.min': '422|"classe" length must be at least 3 characters long',
    }),
    level: Joi.number().required().greater(1).messages({
      'any.required': '400|"level" is required',
      'number.base': '422|"level" must be a number',
      'number.greater': '422|"level" must be greater than or equal to 1',
    }),
    password: Joi.string().required().min(8).messages({
      'any.required': '400|"password" is required',
      'string.base': '422|"password" must be a string',
      'string.min': '422|"password" length must be at least 8 characters long',
    }),
  }),

  create: async (userToCreate:User):Promise<Token> => {
    const { error } = usersService.validateUserData.validate(userToCreate);
    if (error) {
      throw new Error(error.details[0].message);
    }
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