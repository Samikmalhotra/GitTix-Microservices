import nats from 'node-nats-streaming';

const stan = nats.connect('ticketing','abc', {
  url: 'http://localhost:4222'
});

stan.on('connect', () => {
  console.log('Publisher connected to NATS');

  // stan.on('close', () => {
  //   console.log('NATS connection closed');
  //   process.exit();
  // });

  // // publish a message
  // const data = JSON.stringify({
  //   id: '123',
  //   title: 'concert',
  //   price: 20
  // });

  // stan.publish('ticket:created', data, () => {
  //   console.log('Event published');
  //   stan.close();
  // });
});