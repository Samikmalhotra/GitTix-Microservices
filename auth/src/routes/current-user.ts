import express from 'express'
import {Request,Response} from 'express'
import { currentUser } from '../middlewares/current-user'


const router = express.Router()

router.get('/api/users/currentUser',currentUser, (req: Request, res: Response) => {
    res.send({currentUser: req.currentUser || null})
})

export { router as currentUserRouter};