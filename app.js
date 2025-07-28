const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const connectDB = require('./configs/db');
const app = express();
const cors = require('cors');

app.use(express.json());

// Configure CORS to allow your frontend origin and preflight requests
app.use(
  cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use('/user', userRouter);
app.use('/auth', authRouter);

app.listen(3000, async () => {
  await connectDB();
  console.log('Server is starting.........');
});

module.exports = app;
