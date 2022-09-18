import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (
  error: Error, 
  _request: Request,
  response: Response,
  _next: NextFunction,
):Response => {
  const { message } = error;
  if (message.includes('|')) {
    const [code, errorMessage] = message.split('|');
    return response.status(Number(code)).json({ message: errorMessage });
  }
  return response.status(500).json(message);
};

export default errorMiddleware;
