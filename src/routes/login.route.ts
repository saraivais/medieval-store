import express from 'express';
import usersController from '../controllers/users.controller';

const loginRoute = express.Router();

loginRoute.post('/', usersController.login);

export default loginRoute;
