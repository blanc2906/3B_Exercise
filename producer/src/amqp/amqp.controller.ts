import { Controller, Post, Body } from '@nestjs/common';
import { AmqpService } from './amqp.service';

@Controller('messages')
export class AmqpController {
  constructor(private readonly amqpService: AmqpService) {}

  @Post('info')
  async sendInfo(@Body() data: { message: string; subTopic?: string }) {
    return this.amqpService.publishInfo(data.message, data.subTopic);
  }

  @Post('error')
  async sendError(@Body() data: { message: string; subTopic?: string }) {
    return this.amqpService.publishError(data.message, data.subTopic);
  }

  @Post('warning')
  async sendWarning(@Body() data: { message: string; subTopic?: string }) {
    return this.amqpService.publishWarning(data.message, data.subTopic);
  }
}