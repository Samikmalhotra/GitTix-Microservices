import request from 'supertest';
import {app} from '../../app';
import {Ticket} from '../../models/ticket';
import {signinTest} from '../../test/setup'
import mongoose from 'mongoose'

it('fetches the order', async () => {
// Create a ticket
  const ticket = Ticket.build({
    title:'concert',
    price: 20,
    id: new mongoose.Types.ObjectId().toHexString()

  });
  await ticket.save();

  const user = signinTest()
  // Make a request to build an order with this ticket
  const {body: order} = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ticketId: ticket.id})
    .expect(201);

  // Make request to fetch the order
  const {body: fetchedOrder} = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);

  // Make sure we got back the order we created
  expect(fetchedOrder.id).toEqual(order.id);
  
})

it('returns an error if one user tries to fetch another users order', async () => {
  // Create a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    id: new mongoose.Types.ObjectId().toHexString()

  });
  await ticket.save();

  const user = signinTest();
  // make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make request to fetch the order
  await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie',signinTest())
    .send()
    .expect(401);
});