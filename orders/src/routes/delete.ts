import express, {Request, Response} from 'express'
import {Order, OrderStatus} from '../models/order'
import { requireAuth,NotFoundError, NotAuthorizedError } from '@samikmalhotra/microservices-helper';

const router = express.Router();

router.delete('/api/orders/:orderId', async(req:Request, res:Response)=>{
  const {orderId} = req.params;
  const order = await Order.findById(orderId).populate('ticket');
  if(!order){
    throw new NotFoundError()
  }
  if(order.userId !== req.currentUser!.id){
    throw new NotAuthorizedError()
  }
  order.status = OrderStatus.Cancelled;
  await order.save();

  // publish an event saying this was cancelled!
  

  res.status(204).json(order);
});

export {router as deleteOrderRouter}