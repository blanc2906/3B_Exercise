// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'AMQP_OPTIONS',
      useValue: {
        urls: ['amqp://localhost:5672'],
        queue: 'message-queue',
        queueOptions: {
          durable: true,
        },
        noAck: false,
        prefetchCount: 1,
        exchange: 'message-exchange',
        exchangeType: 'topic',
        routingKey: 'message.*.*'
      },
    },
  ],
})
export class AppModule {}