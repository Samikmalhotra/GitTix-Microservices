import express from 'express';
import {currentUserRouter} from './routes/current-user';

const app = express();
app.use(express.json());

app.use(currentUserRouter);

app.listen(3333, () => {
  console.log('Listening on port 3333!!!')
})