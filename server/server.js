import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'


import userRouter from './Routes/userRoutes.js';
import productRouter from './Routes/productRouter.js';
import orderRouter from './Routes/orderRoutes.js';
import uploadRouter from './Routes/uploadRouter.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona-redux') 
.then(() => {
  console.log("connected to db");
})
.catch((err) => {
  console.log(err.message);
});

const app = express();
app.use(express.json(), express.urlencoded({ extended: true }),cors());

app.use('/api/uploads',uploadRouter)
app.use('/api/users', userRouter);
app.use('/api/products',productRouter)
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));



app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serve at http://localhost:${PORT}`);
});