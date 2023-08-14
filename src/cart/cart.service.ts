import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {

  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>
  ){}

  async create(createCartDto: CreateCartDto) {
    try {
      const cart = await this.cartRepository.create(
        {
          ...createCartDto,
        }
      );
      throw await this.cartRepository.save(cart);
    } catch (exception) {
      return exception;
    }
  }

  async findAll() {
    return await this.cartRepository.createQueryBuilder('cart')
    .leftJoinAndSelect('cart.userId', 'users.id')
    .leftJoinAndSelect('cart.productId', 'products.id')
    .where('1')
    .getMany();
  }

  async findOne(id: number) {
    return await this.cartRepository.createQueryBuilder('cart')
    .leftJoinAndSelect('cart.userId', 'users.id')
    .leftJoinAndSelect('cart.productId', 'products.id')
    .where('cart.id = :id', {id})
    .getOne();
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    try {
      await this.cartRepository.update({id: id}, updateCartDto);
      throw 'Cart`s info updated successfully!'
    } catch (exception) {
      return exception;
    }
  }

  async remove(id: number) {
    try {
      await this.cartRepository.delete({id: id});
      throw 'Cart`s info deleted successfully!'
    } catch (exception) {
      return exception;
    }
  }
}
