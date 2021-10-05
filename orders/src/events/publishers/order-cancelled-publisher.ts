import { Subjects, Publisher, OrderCancelledEvent } from '@samikmalhotra/microservices-helper';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
  subject:Subjects.OrderCancelled = Subjects.OrderCancelled;
}