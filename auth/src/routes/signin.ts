import express, {Request,Response} from 'express'
import { body, validationResult } from 'express-validator'
import { RequestValidationError } from '../errors/request-validation-error';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router()

router.post('/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply a password')
  ], 
  validateRequest,
  async(req: Request, res: Response) => {
    const {email, password} = req.body
    console.log(email, password)
  }
)

export { router as signInRouter};