import { Publisher, OrderCreatedEvent, Subjects } from '@samikmalhotra/microservices-helper';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject:Subjects.OrderCreated = Subjects.OrderCreated;
}