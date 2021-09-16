import mongoose from 'mongoose';
import { DatabaseConnectionError } from '@samikmalhotra/microservices-helper';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';

const start = async () => {
  if(!process.env.JWT_KEY){
    throw new Error('JWT_KEY must be defined')
  }
  if(!process.env.MONGO_URI){
    throw new Error('MONGO_URI must be defined')
  }
  try {
    await natsWrapper.connect('ticketing', 'dasdas', 'http://nats-svc:4222')
    await mongoose.connect(process.env.MONGO_URI);
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
