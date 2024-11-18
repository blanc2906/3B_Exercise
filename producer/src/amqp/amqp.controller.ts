import { Body, Controller, Get, Post } from '@nestjs/common';
import { AmqpService } from './amqp.service';

interface PublishMessageDto {
  message: string;
}

@Controller('amqp')
export class AmqpController {
  constructor(private readonly amqpService : AmqpService) {}

  @Post('publish')
  publish(@Body() data : PublishMessageDto) {
    return this.amqpService.publishMessage(data.message);
  }

}