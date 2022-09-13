import express from 'express';
import 'express-async-errors';
import productsRoute from './routes/products.route';

const app = express();

app.use(express.json());
app.use('/products', productsRoute);

export default app;