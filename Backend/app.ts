// require('newrelic');

import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import loggerMiddleware from './middleware/logMiddleware';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes';
import authRouter from './routes/authRoutes';
import todoRouter from './routes/todoRoutes';
import connectDB from './configs/db';
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(loggerMiddleware);

// Configure CORS to allow frontend origin and preflight requests
app.use(
  cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/todos', todoRouter);

app.listen(3000, async () => {
  await connectDB();
  console.log('Server is starting.........');
});

app.use('/uploads', express.static('uploads'));

module.exports = app;
