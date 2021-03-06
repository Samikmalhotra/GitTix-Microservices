import express, {Request,Response} from 'express'
import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator'
import { BadRequestError } from '@samikmalhotra/microservices-helper';
import { RequestValidationError } from '@samikmalhotra/microservices-helper';
import { validateRequest } from '@samikmalhotra/microservices-helper';
import { User } from '../models/user';
import { Password } from '../services/password';

const router = express.Router()

router.post('/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply a password')
  ], 
  validateRequest,
  async(req: Request, res: Response) => {
    const {email, password} = req.body
    
    const existingUser = await User.findOne({email});
    if(!existingUser) {
      throw new BadRequestError('Invalid credentials')
    }
    const passwordsMatch = await Password.compare(existingUser.password, password);
    if(!passwordsMatch) {
      throw new BadRequestError('Invalid credentials')
    }

    // Generate JWT
  const userJwt = jwt.sign({
    id: existingUser.id,
    email: existingUser.email
  },process.env.JWT_KEY!);

  // Store it on session object
  req.session = {
    jwt: userJwt
  }
  res.status(200).json(existingUser);
  }

)

export { router as signInRouter};