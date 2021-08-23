import express from 'express'

const router = express.Router()

router.post('/api/users/signout', (req, res) => {
  res.json('Hello');
})

exports { router as signOutRouter};