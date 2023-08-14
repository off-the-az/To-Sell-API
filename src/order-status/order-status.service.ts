import { Injectable } from '@nestjs/common';
import { CreateOrderStatusDto } from './dto/create-order-status.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderStatus } from './entities/order-status.entity';

@Injectable()
export class OrderStatusService {

  constructor(
    @InjectRepository(OrderStatus) private orderStatusRepository: Repository<OrderStatus>
  ){}

  async create(createOrderStatusDto: CreateOrderStatusDto) {
    try {
      const orderStatus = await this.orderStatusRepository.create(
        {
          ...createOrderStatusDto
        }
      );
      throw await this.orderStatusRepository.save(orderStatus);
    } catch (exception) {
      return exception;
    }
  }

  async findAll() {
    return await this.orderStatusRepository.find();
  }

  async findOne(id: number) {
    return await this.orderStatusRepository.findOneBy({id: id});
  }

  async update(id: number, updateOrderStatusDto: UpdateOrderStatusDto) {
    try {
      await this.orderStatusRepository.update({id: id}, updateOrderStatusDto);
      throw 'Order`s status info updated successfully!'
    } catch (exception) {
      return exception;
    }
  }

  async remove(id: number) {
    try {
      await this.orderStatusRepository.delete({id: id});
      throw 'Order`s status info deleted successfully!'
    } catch (exception) {
      return exception;
    }
  }
}
