import express from 'express'
import {Request,Response} from 'express'

const router = express.Router()

router.post('/api/users/signin', (req: Request, res: Response) => {
  res.json('Hello');
})

export { router as signInRouter};