import express from 'express'
import {body, validationResult} from 'express-validator'
import {Request,Response} from 'express'

const router = express.Router()

router.post('/api/users/signup',[
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().isLength({min:4, max:20}).withMessage('Password must be between 4 and 20 characters')
], (req: Request, res: Response) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json(errors.array());
  }

  const {email,password} = req.body;
  
  console.log('Creating a user')
})

export { router as signUpRouter};