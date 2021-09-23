import express, {Request, Response} from 'express'

const router = express.Router();

router.get('/api/orders', async(req:Request, res:Response)=>{
  res.json({});
});

export {router as indexOrderRouter}