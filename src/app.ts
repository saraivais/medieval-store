import express from 'express';
import 'express-async-errors';
import productsRoute from './routes/products.route';
import usersRoute from './routes/users.route';

const app = express();

app.use(express.json());
app.use('/products', productsRoute);
app.use('/users', usersRoute);

export default app;
