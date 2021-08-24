import {Request, Response, NextFunction} from 'express';
import {CustomError} from '../errors/custom-errors'

export const ErrorHandler = (err: Error, req: Request,res: Response, next: NextFunction) => {
  
  if(err instanceof CustomError){
    
    return res.status(err.statusCode).json({errors: err.serializeErrors()});
  }

  console.log(err);

  res.status(400).send({
    errors: [{message: 'Something went wrong'}]
})
}
