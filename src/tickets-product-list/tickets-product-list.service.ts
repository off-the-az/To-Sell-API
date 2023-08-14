import { Injectable } from '@nestjs/common';
import { CreateTicketsProductListDto } from './dto/create-tickets-product-list.dto';
import { UpdateTicketsProductListDto } from './dto/update-tickets-product-list.dto';
import { TicketsProductList } from './entities/tickets-product-list.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TicketsProductListService {

  constructor(
    @InjectRepository(TicketsProductList) private tickectsProductList: Repository<TicketsProductList>
  ){}

  async create(createTicketsProductListDto: CreateTicketsProductListDto) {
    try {
      const ticketsProduct = await this.tickectsProductList.create(
        {
          ...createTicketsProductListDto
        }
      );
      throw await this.tickectsProductList.save(ticketsProduct);
    } catch (exception) {
      return exception;
    }
  }

  async findAll() {
    return await this.tickectsProductList.createQueryBuilder('ticketsProductList')
    .leftJoinAndSelect('ticketsProductList.ticketId', 'tickets.id')
    .leftJoinAndSelect('ticketsProductList.productId', 'products.id')
    .where('1')
    .getMany();
  }

  async findOne(id: number) {
    return await this.tickectsProductList.createQueryBuilder('ticketsProductList')
    .leftJoinAndSelect('ticketsProductList.ticketId', 'tickets.id')
    .leftJoinAndSelect('ticketsProductList.productId', 'products.id')
    .where('ticketsProductList.id = :id', {id})
    .getOne();
  }

  async update(id: number, updateTicketsProductListDto: UpdateTicketsProductListDto) {
    try {
      await this.tickectsProductList.update({id: id}, updateTicketsProductListDto);
      throw 'Ticket`s product info updated successfully!'
    } catch (exception) {
      return exception;
    }
  }

  async remove(id: number) {
    try {
      await this.tickectsProductList.delete({id: id});
      throw 'Ticket`s product info deleted successfully!'
    } catch (exception) {
      return exception;
    }
  }
}
