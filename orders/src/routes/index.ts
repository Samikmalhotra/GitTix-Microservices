import express, {Request, Response} from 'express'
import { requireAuth } from '@samikmalhotra/microservices-helper';
import { Order } from '../models/order';

const router = express.Router();

router.get('/api/orders', async(req:Request, res:Response)=>{
  const orders = await Order.find({
    userId: req.currentUser!.id
  }).populate('ticket')
  res.json(orders);
});

export {router as indexOrderRouter}