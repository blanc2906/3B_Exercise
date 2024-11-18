import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';

@Injectable()
export class AmqpService {
  constructor(@Inject('AMQP_SERVICE') private rabbitClient: ClientProxy) {}
  publishMessage(message : string) {
    this.rabbitClient.emit('message-sent', message);

    return { message: 'Message sent' };
  }
}