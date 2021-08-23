import express from 'express'

const router = express.Router()

router.post('/api/users/signin', (req, res) => {
  res.json('Hello');
})

exports { router as signInRouter};