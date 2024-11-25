export class MessageDto {
    readonly message: string;
    readonly topic: string;
    readonly severity?: string;
    readonly timestamp: Date;
  }