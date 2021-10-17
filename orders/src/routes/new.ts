import express, {Request, Response} from 'express'
import { NotFoundError, requireAuth, validateRequest, BadRequestError } from '@samikmalhotra/microservices-helper';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';
import { Order, OrderStatus } from '../models/order';
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

const EXPIRATION_WINDOW_SETTINGS = 0.5*60;

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
  // Run query to look at all orders. Find an order where the ticket is the ticket we just found & order status is not cancelled
  // If we find an order from that means the ticket is reserved
  const isReserved = await ticket.isReserved();
  if(isReserved){
    throw new BadRequestError('Ticket is already reserved');
  }

  // Calculate an expiration date for this order
  const expiration = new Date();
  expiration.setSeconds(expiration.getSeconds()+EXPIRATION_WINDOW_SETTINGS);



  // Build the order and save it to the database
  const order = Order.build({
    userId:req.currentUser!.id,
    status: OrderStatus.Created,
    expiresAt: expiration,
    ticket: ticket
  })
  await order.save();


  // Publish an event saying that an order was created
  new OrderCreatedPublisher(natsWrapper.client).publish({
    id: order.id,
    status: order.status,
    userId: order.userId,
    expiresAt: order.expiresAt.toISOString(),
    version: order.version,
    ticket: {
      id: ticket.id,
      price: ticket.price
    }
  })

  res.status(201).json(order)

});

export {router as newOrderRouter}