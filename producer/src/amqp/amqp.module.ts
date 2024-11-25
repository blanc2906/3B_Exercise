import { Module } from '@nestjs/common';
import { AmqpController } from './amqp.controller';
import { AmqpService } from './amqp.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AMQP_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'message-queue',
          queueOptions: {
            durable: true
          },
        },
      },
    ]),
  ],
  controllers: [AmqpController],
  providers: [AmqpService],
})
export class AmqpModule {}