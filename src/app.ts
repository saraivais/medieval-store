import express from 'express';
import 'express-async-errors';
import productsRoute from './routes/products.route';
import usersRoute from './routes/users.route';
import ordersRoute from './routes/orders.route';
import loginRoute from './routes/login.route';
import errorMiddleware from './middlewares/errorMiddleware';

const app = express();

app.use(express.json());
app.use('/products', productsRoute);
app.use('/users', usersRoute);
app.use('/orders', ordersRoute);
app.use('/login', loginRoute);

app.use(errorMiddleware);

export default app;
