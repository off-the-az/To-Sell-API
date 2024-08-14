import { Module } from '@nestjs/common';
import { SiteConstructorController } from './site-constructor.controller';
import { SiteConstructorService } from './site-constructor.service';

@Module({
  imports: [],
  controllers: [SiteConstructorController],
  providers: [SiteConstructorService],
})
export class SiteConstructorModule {}
