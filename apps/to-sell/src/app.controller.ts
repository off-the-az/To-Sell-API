import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  @Render('panel')
  root() {
    return { message: 'To Sell Admin' };
  }

  @Get('/dev')
  @Render('panel-dev')
  dev_root() {
    return { message: 'To Sell Admin - Dev' };
  }
}
