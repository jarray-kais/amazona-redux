import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import http from 'http';
import { Server } from 'socket.io';


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

app.get('/api/config/google', (req, res) => {
  res.send(process.env.GOOGLE_API_key || 'sb');
});


const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));



app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});


const PORT = process.env.PORT || 5000;

const httpServer = http.Server(app);
const io = new Server(httpServer, { cors: { origin: '*' } });
const users = [];

io.on('connection', (socket) => {
  console.log('connection', socket.id);
  socket.on('disconnect', () => {
    const user = users.find((x) => x.socketId === socket.id);
    if (user) {
      user.online = false;
      console.log('Offline', user.name);
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit('updateUser', user);
      }
    }
  });
  socket.on('onLogin', (user) => {
    const updatedUser = {
      ...user,
      online: true,
      socketId: socket.id,
      messages: [],
    };
    const existUser = users.find((x) => x._id === updatedUser._id);
    if (existUser) {
      existUser.socketId = socket.id;
      existUser.online = true;
    } else {
      users.push(updatedUser);
    }
    console.log('Online', user.name);
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      io.to(admin.socketId).emit('updateUser', updatedUser);
    }
    if (updatedUser.isAdmin) {
      io.to(updatedUser.socketId).emit('listUsers', users);
    }
  });

  socket.on('onUserSelected', (user) => {
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      const existUser = users.find((x) => x._id === user._id);
      io.to(admin.socketId).emit('selectUser', existUser);
    }
  });

  socket.on('onMessage', (message) => {
    if (message.isAdmin) {
      const user = users.find((x) => x._id === message._id && x.online);
      if (user) {
        io.to(user.socketId).emit('message', message);
        user.messages.push(message);
      }
    } else {
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit('message', message);
        const user = users.find((x) => x._id === message._id && x.online);
        user.messages.push(message);
      } else {
        io.to(socket.id).emit('message', {
          name: 'Admin',
          body: 'Sorry. I am not online right now',
        });
      }
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`Serve at http://localhost:${PORT}`);
});