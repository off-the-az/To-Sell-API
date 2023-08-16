import { Injectable } from '@nestjs/common';
import { CreateProductsCategoryDto } from './dto/create-products-category.dto';
import { UpdateProductsCategoryDto } from './dto/update-products-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsCategory } from './entities/products-category.entity';

@Injectable()
export class ProductsCategoryService {

  constructor(
    @InjectRepository(ProductsCategory) private productsCategoryRepository: Repository<ProductsCategory>
  ){}

  async create(createProductsCategoryDto: CreateProductsCategoryDto) {
    try {
      const productsCategory = this.productsCategoryRepository.create(
        {
          ...createProductsCategoryDto,
        }
      );
      throw await this.productsCategoryRepository.save(productsCategory);
    } catch (exception) {
      return exception;
    }
  }

  async findAll() {
    return await this.productsCategoryRepository.createQueryBuilder('productsCategory')
    .leftJoinAndSelect('productsCategory.productId', 'products.id')
    .leftJoinAndSelect('productsCategory.categoryId', 'category.id')
    .where('1')
    .getMany();
  }

  async findOne(id: number) {
    return await this.productsCategoryRepository.createQueryBuilder('productsCategory')
    .leftJoinAndSelect('productsCategory.productId', 'products.id')
    .leftJoinAndSelect('productsCategory.categoryId', 'category.id')
    .where('productsCategory.id = :id', {id})
    .getOne();
  }

  async findAllByCategory(id: number) {
    return await this.productsCategoryRepository.createQueryBuilder('productsCategory')
    .leftJoinAndSelect('productsCategory.productId', 'products.id')
    .where('productsCategory.categoryId = :id', {id})
    .getMany();
  }

  async update(id: number, updateProductsCategoryDto: UpdateProductsCategoryDto) {
    try {
      await this.productsCategoryRepository.update({id: id}, updateProductsCategoryDto);
      throw 'Product`s category Updated successfully!';
    } catch (exception) {
      return exception;
    }
  }

  async remove(id: number) {
    try {
      await this.productsCategoryRepository.delete({id: id});
      throw 'Product`s category Deleted successfully!';
    } catch (exception) {
      return exception;
    }
  }
}
