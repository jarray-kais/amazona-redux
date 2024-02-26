import express from 'express';
import data from './data.js';
import cors from 'cors'
import mongoose from 'mongoose'


import userRouter from './Routes/userRoutes.js';

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona-redux') 
.then(() => {
  console.log("connected to db");
})
.catch((err) => {
  console.log(err.message);
});

const app = express();
app.use(express.json(), express.urlencoded({ extended: true }),cors());

app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((x)=>x._id=== req.params.id)
  if(product){
    res.send(product)
  }
  else{
    res.status(404).send({message : 'Product Not Found'})
  }
});

app.get('/api/products', (req, res) => {
  res.send(data.products);
});


app.use('/api/users', userRouter);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});