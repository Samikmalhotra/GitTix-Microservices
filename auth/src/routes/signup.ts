import express from 'express'

const router = express.Router()

router.post('/api/users/signup', (req, res) => {
  res.json('Hello');
})

exports { router as signUpRouter};