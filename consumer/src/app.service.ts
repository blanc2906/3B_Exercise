import { Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class AppService {
  handleInfo(data: MessageDto) {
    return { received: true, type: 'info', data };
  }

  handleError(data: MessageDto) {
    return { received: true, type: 'error', data };
  }

  handleWarning(data: MessageDto) {
    return { received: true, type: 'warning', data };
  }
}