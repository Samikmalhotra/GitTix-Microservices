import express from 'express'
import {Request,Response} from 'express'

const router = express.Router()

router.get('/api/users/currentUser', (req: Request, res: Response) => {
  res.json('Hello');
})

export { router as currentUserRouter};