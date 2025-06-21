const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const connectDB = require('./configs/db');
const app = express();
app.use(express.json());

app.use('/users', userRouter);

app.listen(3000, async () => {
  await connectDB();
  console.log('Server is starting.........');
});

module.exports = app;
