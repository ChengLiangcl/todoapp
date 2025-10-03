require('dotenv').config(); // load .env first
require('newrelic');
const express = require('express');
const loggerMiddleware = require('./middleware/logMiddleware');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const todoRouter = require('./routes/todoRoutes');
const connectDB = require('./configs/db');
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
