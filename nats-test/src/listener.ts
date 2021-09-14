import nats from 'node-nats-streaming';

const stan = nats.connect('ticketing', '123', {
  url: 'http://localhost:4222',
})

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  // stan.on('close', () => {
  //   console.log('NATS connection closed');
  //   process.exit();
  // });

  // process.on('SIGINT', () => stan.close());
  // process.on('SIGTERM', () => stan.close());

  // stan.subscribe('ticket:created', (msg: any) => {
  //   console.log(`Processing a new ticket: ${msg.data}`);
  // });
})