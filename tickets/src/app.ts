import express from 'express';
import 'express-async-errors'
import cookieSession from 'cookie-session';
import { ErrorHandler } from '@samikmalhotra/microservices-helper';
import { NotFoundError } from '@samikmalhotra/microservices-helper';
import { createTicketRouter } from './routes/new';

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
)

app.use(createTicketRouter)

app.all('*', async() => {
  throw new NotFoundError();
})

app.use(ErrorHandler);


export {app};