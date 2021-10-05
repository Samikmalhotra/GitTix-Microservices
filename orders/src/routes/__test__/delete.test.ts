import request from 'supertest';
import { app } from '../../app';
import {Ticket} from '../../models/ticket';
import {Order, OrderStatus} from '../../models/order';
import{signinTest} from '../../test/setup'
import {natsWrapper} from '../../nats-wrapper';

it('marks an order as cancelled', async () => {
  // Create a ticket with Ticket Model
  const ticket = await Ticket.build({
    title: 'concert',
    price: 20,
  });
  await ticket.save();
 
  const user = signinTest();

  // make a request to create an order
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make a request to cancel the order
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);

  // expectation to make sure the thing is cancelled
  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
})

it('emits an order cancelled event', async() => {
  const ticket = await Ticket.build({
    title: 'concert',
    price: 20,
  });
  await ticket.save();
 
  const user = signinTest();

  // make a request to create an order
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make a request to cancel the order
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});