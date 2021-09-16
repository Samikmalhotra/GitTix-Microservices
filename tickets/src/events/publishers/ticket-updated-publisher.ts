import { Publisher, Subjects, TicketUpdatedEvent } from '@samikmalhotra/microservices-helper';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated
}