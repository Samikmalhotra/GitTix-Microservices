import { ValidationError } from 'express-validator';

// interface CustomError {
//   statusCode: number;
//   serializeErrors(): {
//     message: string;
//     field?: string;
//   }[]
// }

export class RequestValidationError extends Error {
  statusCode = 400
  constructor(public errors: ValidationError[]) {
    super();

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(){
    return this.errors.map(error => {
      return {
        field: error.param,
        message: error.msg
      };
    });
  }
}