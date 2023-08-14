import { Injectable } from '@nestjs/common';
import { CreateProductsPhotoListDto } from './dto/create-products-photo-list.dto';
import { UpdateProductsPhotoListDto } from './dto/update-products-photo-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsPhotoList } from './entities/products-photo-list.entity';

@Injectable()
export class ProductsPhotoListService {

  constructor(
    @InjectRepository(ProductsPhotoList) private productsPhotoListRepository: Repository<ProductsPhotoList>
  ){}

  async create(createProductsPhotoListDto: CreateProductsPhotoListDto) {
    try {
      const productPhotoList = await this.productsPhotoListRepository.create(
        {
          ...createProductsPhotoListDto,
        }
      );
      throw await this.productsPhotoListRepository.save(productPhotoList);
    } catch (exception) {
      return exception;
    }
  }

  async findAll() {
    return await this.productsPhotoListRepository.createQueryBuilder('productsPhotoList')
    .leftJoinAndSelect('productsPhotoList.productId', 'products.id')
    .where('1')
    .getMany();
  }

  async findOne(id: number) {
    return await this.productsPhotoListRepository.createQueryBuilder('productsPhotoList')
    .leftJoinAndSelect('productsPhotoList.productId', 'products.id')
    .where('productsPhotoList.productId = :id', {id})
    .getOne();
  }

  async update(id: number, updateProductsPhotoListDto: UpdateProductsPhotoListDto) {
    try {
      await this.productsPhotoListRepository.update({id:id}, updateProductsPhotoListDto);
      throw 'Product`s Photo info updated successfully!'
    } catch (exception) {
      return exception;
    }
  }

  async remove(id: number) {
    try {
      await this.productsPhotoListRepository.delete({id:id});
      throw 'Product`s Photo info deleted successfully!'
    } catch (exception) {
      return exception;
    }
  }
}
