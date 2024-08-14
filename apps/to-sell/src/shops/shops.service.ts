import { Injectable } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop) private shopRepository: Repository<Shop>,
  ) {}

  async create(createShopDto: CreateShopDto) {
    try {
      const shop = await this.shopRepository.create({
        ...createShopDto,
      });
      throw await this.shopRepository.save(shop);
    } catch (exception) {
      return exception;
    }
  }

  async findAll() {
    return await this.shopRepository
      .createQueryBuilder('shops')
      .leftJoinAndSelect('shops.ownerId', 'user.id')
      .where('1')
      .getMany();
  }

  async findOne(id: number) {
    return await this.shopRepository
      .createQueryBuilder('shops')
      .leftJoinAndSelect('shops.ownerId', 'user.id')
      .where('shop.id = :id', { id })
      .getOne();
  }

  async update(id: number, updateShopDto: UpdateShopDto) {
    try {
      await this.shopRepository.update({ id: id }, updateShopDto);
      throw 'Shop info updated!';
    } catch (exception) {
      return exception;
    }
  }

  async remove(id: number) {
    try {
      await this.shopRepository.delete({ id: id });
      throw 'Shop info deleted!';
    } catch (exception) {
      return exception;
    }
  }
}
