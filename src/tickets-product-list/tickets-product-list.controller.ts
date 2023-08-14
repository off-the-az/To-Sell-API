import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketsProductListService } from './tickets-product-list.service';
import { CreateTicketsProductListDto } from './dto/create-tickets-product-list.dto';
import { UpdateTicketsProductListDto } from './dto/update-tickets-product-list.dto';

@Controller('api/tickets-product-list')
export class TicketsProductListController {
  constructor(private readonly ticketsProductListService: TicketsProductListService) {}

  @Post()
  create(@Body() createTicketsProductListDto: CreateTicketsProductListDto) {
    return this.ticketsProductListService.create(createTicketsProductListDto);
  }

  @Get()
  findAll() {
    return this.ticketsProductListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsProductListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketsProductListDto: UpdateTicketsProductListDto) {
    return this.ticketsProductListService.update(+id, updateTicketsProductListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsProductListService.remove(+id);
  }
}
