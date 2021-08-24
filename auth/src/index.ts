import express from 'express';
import {currentUserRouter} from './routes/current-user';
import {signInRouter} from './routes/signin';
import {signOutRouter} from './routes/signout';
import {signUpRouter} from './routes/signup';
import { ErrorHandler } from './middlewares/error-handler';

const app = express();
app.use(express.json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.use(ErrorHandler);

app.listen(3333, () => {
  console.log('Listening on port 3333!!!')
})