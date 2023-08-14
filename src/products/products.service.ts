import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>
  ){}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = await this.productRepository.create(
        {
          ...createProductDto,
        }
      );
      throw await this.productRepository.save(product);
    } catch (exception) {
      return exception;
    }
  }

  async findAll() {
    return await this.productRepository.createQueryBuilder('products')
    .leftJoinAndSelect('products.shopId', 'shops.id')
    .where('1')
    .getMany();
  }

  async findOne(id: number) {
    return await this.productRepository.createQueryBuilder('products')
    .leftJoinAndSelect('products.shopId', 'shops.id')
    .where('products.id = :id', {id})
    .getOne();
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      await this.productRepository.update({id: id}, updateProductDto);
      throw 'Product info Updated!';
    } catch (exception) {
      return exception;
    }
  }

  async remove(id: number) {
    try {
      await this.productRepository.delete({id: id});
      throw 'Product info Deleted!'
    } catch (exception) {
      return exception;
    }
  }
}
