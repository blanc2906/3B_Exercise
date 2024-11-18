import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  handleMessageSent(data : any) {
    console.log(`Received a new message: `, JSON.stringify(data));
  
  }
}