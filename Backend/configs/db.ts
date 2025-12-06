import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string); // type assertion if needed
    console.log('MongoDB connected successfully');
  } catch (error: any) {
    throw new Error('Failed to connect to MongoDB database: ' + error.message);
  }
};

export default connectDB;
