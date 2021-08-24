import {Request, Response, NextFunction} from 'express';
import {DatabaseConnectionError} from '../errors/database-connection-error'
import {RequestValidationError} from '../errors/request-validation-error'

export const ErrorHandler = (err: Error, req: Request,res: Response, next: NextFunction) => {
  
  if(err instanceof RequestValidationError){
    console.log('handling this error as a request validation error')
  }

  if(err instanceof DatabaseConnectionError){
    console.log('handling this error as a db connection error')
  }
  console.log(err);

  res.status(400).send({
    message: err.message
})
}
