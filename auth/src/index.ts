import express from 'express';

const app = express();
app.use(express.json());

app.get('/api/users/currentUser', (req,res)=>{
  res.json('Hello')
})

app.listen(3333, () => {
  console.log('Listening on port 3333!!!')
})