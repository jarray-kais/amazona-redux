import express from 'express';
import data from './data.js';
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'


import userRouter from './Routes/userRoutes.js';
import productRouter from './Routes/productRouter.js';

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


app.use('/api/users', userRouter);
app.use('/api/products',productRouter)



app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});