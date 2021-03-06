import request from 'supertest'
import { app } from '../../app'
import { signinTest } from '../../test/setup';
import {Ticket} from '../../models/ticket';
import {natsWrapper} from '../../nats-wrapper'

it('has a route handler listening to /api/tickets for post requests', async()=>{
  const response = await request(app)
    .post('/api/tickets')
    .send({});

  expect(response.status).not.toEqual(404);
})

it('can only be accessed if the user is signed in', async()=>{
  const response = await request(app)
    .post('/api/tickets')
    .send({});
  
  expect(response.status).toEqual(401);

})

it('returns a stataus other than 401 if the user is signed in', async()=>{
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', signinTest())
    .send({});

  expect(response.status).not.toEqual(401);
})

it('returns an error if an invalid title is provided', async()=>{
  await request(app)
    .post('/api/tickets')
    .set('Cookie', signinTest())
    .send({
      title: '',
      price: 10
    })
    .expect(400);
})

it('returns an error if an invalid price is provided', async()=>{
  await request(app)
    .post('/api/tickets')
    .set('Cookie', signinTest())
    .send({
      title: 'adasd',
      price: -10
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', signinTest())
    .send({
      title: 'adasd'
    })
    .expect(400);
})

it('creates a ticket with valid inputs', async()=>{
  // add in a check to make sure ticket was saved
  let tickets = await Ticket.find({})
  expect(tickets.length).toEqual(0);

  const title = 'zsad'
  const price = 20

  await request(app)
    .post('/api/tickets')
    .set('Cookie', signinTest())
    .send({
      title, price
    })
    .expect(201);

  tickets = await Ticket.find({})
  expect(tickets.length).toEqual(1);
  expect(tickets[0].price).toEqual(20);
  expect(tickets[0].title).toEqual(title);

})

it('publishes an event', async()=>{
  const title='sxbqaui'

  await request(app)
    .post('/api/tickets')
    .set('Cookie', signinTest())
    .send({
      title,
      price: 20
    })
    .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled()
})