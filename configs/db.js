require('dotenv').config();

const { json } = require('express');
const { MongoClient } = require('mongodb');
const { default: mongoose } = require('mongoose');

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    throw Error('Failed to connect to MongoDB database');
  }
};

module.exports = connectDB;
