import express, {Request, Response} from 'express'
import { requireAuth, validateRequest } from '@samikmalhotra/microservices-helper';
import { body } from 'express-validator';

const router = express.Router();

router.post('/api/orders',requireAuth, [
  body('ticketId').not().isEmpty().withMessage('TicketId must be provided')
], async(req:Request, res:Response)=>{
  res.json({});
});

export {router as newOrderRouter}