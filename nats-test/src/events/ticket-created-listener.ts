import { Listener } from './base-listener';
import {Message} from 'node-nats-streaming';

class TicketCreatedListener extends Listener {
  subject = 'ticket:created';
  queueGroupName = 'payments-service';
  onMessage(data: any, msg: Message) {
    console.log(data);
    console.log(`A ticket was created: ${data.id}`);

    // Simulate long running process
    setTimeout(() => {
      console.log(`Finished processing ticket: ${data.id}`);
      msg.ack();
    }, this.ackWait);
  }
} 

export { TicketCreatedListener };