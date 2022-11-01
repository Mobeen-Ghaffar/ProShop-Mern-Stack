import express from 'express';
import dotenv from "dotenv";

import connectDB from './config/db.js';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorMilddleware.js';
import userRoutes from './routes/userRoutes.js';
dotenv.config();
connectDB();

const app = express();


app.use(express.json())


app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
// userRoutes

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))
app.get('/', (req, res) => {
    res.send('API is running....')
})



app.get('/api/products', (req, res) => {
    res.json(products)
})



app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p._id == req.params.id)

    res.json(product)
})


app.use(errorHandler);
app.use(notFound);
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold));   
