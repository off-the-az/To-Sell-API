import { Module } from '@nestjs/common';
import { TicketsProductListService } from './tickets-product-list.service';
import { TicketsProductListController } from './tickets-product-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsProductList } from './entities/tickets-product-list.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TicketsProductList
    ])
  ],
  controllers: [TicketsProductListController],
  providers: [TicketsProductListService]
})
export class TicketsProductListModule {}
