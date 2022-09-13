import express from 'express';
import usersController from '../controllers/users.controller';

const usersRoute = express.Router();

usersRoute.post('/', usersController.create);

export default usersRoute;