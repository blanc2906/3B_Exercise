import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as amqp from 'amqplib';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class AmqpService implements OnModuleInit {
  private channel: amqp.Channel;
  private readonly exchangeName = 'message-exchange';

  constructor(@Inject('AMQP_SERVICE') private rabbitClient: ClientProxy) {}

  async onModuleInit() {
    const connection = await amqp.connect('amqp://localhost:5672');
    this.channel = await connection.createChannel();
    await this.channel.assertExchange(this.exchangeName, 'topic', { durable: true });
  }

  async publishMessage(messageData: Partial<MessageDto>, routingKey: string) {
    const fullMessage = {
      ...messageData,
      topic: routingKey,
      timestamp: new Date(),
    };

    const buffer = Buffer.from(JSON.stringify(fullMessage));
    
    console.log('Publishing message with:', {
      exchange: this.exchangeName,
      routingKey,
      message: fullMessage,
      messageString: JSON.stringify(fullMessage)
    });

    await this.channel.publish(
      this.exchangeName,
      routingKey,
      buffer,
      {
        persistent: true,
        contentType: 'application/json',
      }
    );

    return { success: true, message: fullMessage };
  }

  async publishInfo(message: string, subTopic: string = 'general') {
    const routingKey = `message.info.${subTopic}`;
    return this.publishMessage({ message }, routingKey);
  }

  async publishError(message: string, subTopic: string = 'general') {
    const routingKey = `message.error.${subTopic}`;
    return this.publishMessage({ message, severity: 'high' }, routingKey);
  }

  async publishWarning(message: string, subTopic: string = 'general') {
    const routingKey = `message.warning.${subTopic}`;
    return this.publishMessage({ message, severity: 'medium' }, routingKey);
  }
}