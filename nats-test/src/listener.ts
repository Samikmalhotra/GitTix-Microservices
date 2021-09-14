import nats, {Message} from 'node-nats-streaming';

console.clear();

const stan = nats.connect('ticketing', '123', {
  url: 'http://localhost:4222',
})

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  const subscription = stan.subscribe('ticket:created');

  subscription.on('message', (msg: Message) => {
    const data = msg.getData();

    if (typeof data === 'string') {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }
  })

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