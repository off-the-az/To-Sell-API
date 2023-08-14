import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TicketService {

  constructor(
    @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>
  ){}

  async create(createTicketDto: CreateTicketDto) {
    try {
      const ticket = await this.ticketRepository.create(
        {
          ...createTicketDto
        }
      );
      throw await this.ticketRepository.save(ticket);
    } catch (exception) {
      return exception;
    }
  }

  async findAll() {
    return await this.ticketRepository.createQueryBuilder('tickets')
    .leftJoinAndSelect('tickets.userId', 'users.id')
    .where('1')
    .getMany();
  }

  async findOne(id: number) {
    return await this.ticketRepository.createQueryBuilder('tickets')
    .leftJoinAndSelect('tickets.userId', 'users.id')
    .where('tickets.id = :id', {id})
    .getOne();
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    try {
      await this.ticketRepository.update({id: id}, updateTicketDto);
      throw 'Ticket`s info updated successfully!'
    } catch (exception) {
      return exception;
    }
  }

  async remove(id: number) {
    try {
      await this.ticketRepository.delete({id: id});
      throw 'Ticket`s info deleted successfully!'
    } catch (exception) {
      return exception;
    }
  }
}
