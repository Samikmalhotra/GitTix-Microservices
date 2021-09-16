import { Publisher, Subjects, TicketCreatedEvent } from '@samikmalhotra/microservices-helper';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
  subject: Subjects.TicketCreated = Subjects.TicketCreated
}