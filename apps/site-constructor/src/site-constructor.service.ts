import { Injectable } from '@nestjs/common';

@Injectable()
export class SiteConstructorService {
  getHello(): string {
    return 'Hello World!';
  }
}
