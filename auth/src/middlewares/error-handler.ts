import {Request, Response, NextFunction} from 'express';
import {DatabaseConnectionError} from '../errors/database-connection-error'
import {RequestValidationError} from '../errors/request-validation-error'

export const ErrorHandler = (err: Error, req: Request,res: Response, next: NextFunction) => {
  
  if(err instanceof RequestValidationError){
    
    return res.status(err.statusCode).json({errors: err.serializeErrors()});
  }

  if(err instanceof DatabaseConnectionError){
    return res.status(err.statusCode).json({errors: err.serializeErrors()});
  }
  console.log(err);

  res.status(400).send({
    errors: [{message: 'Something went wrong'}]
})
}
