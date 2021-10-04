import express, {Request, Response} from 'express'
import { NotFoundError, requireAuth, validateRequest } from '@samikmalhotra/microservices-helper';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';
import { Order } from '../models/order';

const router = express.Router();

router.post('/api/orders',requireAuth, [
  body('ticketId').not().isEmpty().withMessage('TicketId must be provided')
], async(req:Request, res:Response)=>{
  const {ticketId} = req.body;

  // Find the ticket the user is trying to order in the database
  const ticket = await Ticket.findById(ticketId);
  if(!ticket){
    throw new NotFoundError();
  }

  // Make sure that this ticket is not already reserved

  // Calculate an expiration date for this order

  // Build the order and save it to the database

  // Publish an event saying that an order was created

  res.json({});
});

export {router as newOrderRouter}