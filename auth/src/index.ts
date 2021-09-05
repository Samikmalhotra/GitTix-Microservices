import mongoose from 'mongoose';
import { DatabaseConnectionError } from '@samikmalhotra/microservices-helper';
import { app } from './app';

const start = async () => {
  if(!process.env.JWT_KEY){
    throw new Error('JWT_KEY must be defined')
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-svc:27017/auth');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
    throw new DatabaseConnectionError();
  }
  app.listen(3333, () => {
    console.log('Listening on port 3333!!!')
  })
};

start();
