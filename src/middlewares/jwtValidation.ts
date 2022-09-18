import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const jwtValidation = (request: Request, response: Response, next: NextFunction):void => {
  const jwtSecret = process.env.JWT_SECRET || 'Unbowed, Unbent, Unbroken';

  const token:string = request.headers.authorization || '';

  if (!token) throw new Error('401|Token not found');

  try {
    jwt.verify(token, jwtSecret);
    next();
  } catch (_err) {
    throw new Error('401|Invalid token');
  }
};

export default jwtValidation;
