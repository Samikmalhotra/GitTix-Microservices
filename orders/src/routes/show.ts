import { NotFoundError, NotAuthorizedError } from '@samikmalhotra/microservices-helper';
import express, {Request, Response} from 'express'
import { Order } from '../models/order';

const router = express.Router();

router.get('/api/orders/:orderId', async(req:Request, res:Response)=>{
  const order = await Order.findById(req.params.orderId).populate('ticket');
  if(!order){
    throw new NotFoundError();
  }
  if(order.userId !== req.currentUser!.id){
    throw new NotAuthorizedError();
  }

  res.json(order);
});

export {router as showOrderRouter}