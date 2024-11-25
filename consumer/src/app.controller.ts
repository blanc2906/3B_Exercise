import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessageDto } from './dto/message.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  async handleInfo(data: MessageDto) {
    return this.appService.handleInfo(data);
  }

  async handleError(data: MessageDto) {
    return this.appService.handleError(data);
  }

  async handleWarning(data: MessageDto) {
    return this.appService.handleWarning(data);
  }
}