import { Listener } from './base-listener';
import {Message} from 'node-nats-streaming';
import {TicketCreatedEvent} from './ticket-created-event';
import { Subjects } from './subjects';
class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = 'payments-service';
  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
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