import { Stan, Message } from 'node-nats-streaming';

abstract class Listener {
  abstract subject: string;
  abstract queueGroupName: string;
  abstract onMessage(data: any, msg: Message): void;
  private client: Stan;
  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client.subscriptionOptions()
        .setDeliverAllAvailable()
        .setManualAckMode(true)
        .setDurableName(this.queueGroupName);
  }

  listen() {
    const subscription = this.client.subscribe(this.subject, this.queueGroupName,
        this.subscriptionOptions());

    subscription.on('message', (msg: Message) => {
      console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);

      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString('utf8'));
  }
}

export {Listener};