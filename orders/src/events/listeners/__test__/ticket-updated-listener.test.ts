import { TicketUpdatedEvent} from '@samikmalhotra/microservices-helper'
import {natsWrapper} from '../../../nats-wrapper'
import {Ticket} from '../../../models/ticket'
import mongoose from 'mongoose'
import { TicketUpdatedListener } from '../ticket-updated-listener'
import {Message} from 'node-nats-streaming'

const setup = async () => {
  // Create a listener
  const listener = new TicketUpdatedListener(natsWrapper.client);

  // Create and save a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20
  })
  await ticket.save();

  // Create a fake data object
  const data: TicketUpdatedEvent['data'] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: 'new concert',
    price: 999,
    userId: 'xajnxi'
  }


  // Create a afake msg object
  // @ts-ignore
  const msg:Message = {
    ack: jest.fn(),
  }

  // return all of this stuff
  return {msg, data, ticket, listener}
}

it('finds,updates and saves a ticket', async()=>{
  const {listener, data, msg, ticket} = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id)

  expect(updatedTicket!.title).toEqual(data.title);
  expect(updatedTicket!.price).toEqual(data.price);
  expect(updatedTicket!.version).toEqual(data.version);  
})

it('acks the msg', async()=>{
  const {listener, data, msg, ticket} = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();

})

it('does not call the ack function if the event has a skipped version', async()=>{
  const {msg, data, listener, ticket} = await setup();

  data.version = 10;

  try{
    await listener.onMessage(data,msg);
  }catch(e){

  }

  expect(msg.ack).not.toHaveBeenCalled()

})