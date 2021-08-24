import express from 'express';
import 'express-async-errors'
import {currentUserRouter} from './routes/current-user';
import {signInRouter} from './routes/signin';
import {signOutRouter} from './routes/signout';
import {signUpRouter} from './routes/signup';
import { ErrorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(express.json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all('*', async() => {
  throw new NotFoundError();
})

app.use(ErrorHandler);

app.listen(3333, () => {
  console.log('Listening on port 3333!!!')
})