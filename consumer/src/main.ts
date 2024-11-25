import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as amqp from 'amqplib';
import { AppController } from './app.controller';

async function bootstrap() {
  const connection = await amqp.connect('amqp://localhost:5672');
  const channel = await connection.createChannel();
  
  await channel.assertExchange('message-exchange', 'topic', { durable: true });
  
  await channel.assertQueue('message-queue', { durable: true });
  
  await channel.bindQueue('message-queue', 'message-exchange', 'message.info.*');
  await channel.bindQueue('message-queue', 'message-exchange', 'message.error.*');
  await channel.bindQueue('message-queue', 'message-exchange', 'message.warning.*');

  const app = await NestFactory.create(AppModule);
  await app.init();

  const appController = app.get(AppController);

  channel.consume('message-queue', async (msg) => {
    if (msg) {
      try {
        const content = JSON.parse(msg.content.toString());
        console.log('Received message:', {
          routingKey: msg.fields.routingKey,
          content
        });
        
        const routingKey = msg.fields.routingKey;
        
        if (routingKey.startsWith('message.info.')) {
          await appController.handleInfo(content);
        } else if (routingKey.startsWith('message.error.')) {
          await appController.handleError(content);
        } else if (routingKey.startsWith('message.warning.')) {
          await appController.handleWarning(content);
        }
        
        channel.ack(msg);
      } catch (error) {
        console.error('Error processing message:', error);
        channel.nack(msg, false, false);
      }
    }
  });
}

bootstrap();