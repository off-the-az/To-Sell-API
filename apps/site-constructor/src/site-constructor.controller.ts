import { Controller, Get } from '@nestjs/common';
import { SiteConstructorService } from './site-constructor.service';

@Controller()
export class SiteConstructorController {
  constructor(private readonly siteConstructorService: SiteConstructorService) {}

  @Get()
  getHello(): string {
    return this.siteConstructorService.getHello();
  }
}
