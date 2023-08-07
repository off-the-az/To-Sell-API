import { Injectable } from '@nestjs/common';
import { CreateCategoriesAttributeDto } from './dto/create-categories-attribute.dto';
import { UpdateCategoriesAttributeDto } from './dto/update-categories-attribute.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesAttribute } from './entities/categories-attribute.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesAttributeService {
  constructor(
    @InjectRepository(CategoriesAttribute) private catAttRepository: Repository<CategoriesAttribute>
  ){}

  async create(createCategoriesAttributeDto: CreateCategoriesAttributeDto) {
    try {
      const categoriesAttribute = await this.catAttRepository.create(
        {
          ...createCategoriesAttributeDto,
        }
      );
      throw await this.catAttRepository.save(categoriesAttribute);
    } catch (exception) {
      return exception;
    }
  }

  findAll() {
    return this.catAttRepository.createQueryBuilder('categoriesAttribute')
    .leftJoinAndSelect('categoriesAttribute.categoryId', 'categoryId')
    .leftJoinAndSelect('categoriesAttribute.attributeId', 'attributeId')
    .getMany();
  }

  findOneById(id: number) {
    return this.catAttRepository.createQueryBuilder('categoriesAttribute')
    .leftJoinAndSelect('categoriesAttribute.categoryId', 'categoryId')
    .leftJoinAndSelect('categoriesAttribute.attributeId', 'attributeId')
    .where('categoriesAttribute.id = :id', {id})
    .getOne();
  }

  findOneByCategoryId(id: number) {
    return this.catAttRepository.createQueryBuilder('categoriesAttribute')
    .leftJoinAndSelect('categoriesAttribute.categoryId', 'categoryId')
    .leftJoinAndSelect('categoriesAttribute.attributeId', 'attributeId')
    .where('categoriesAttribute.categoryId = :id', {id})
    .getMany();
  }

  findOneByAttributeId(id: number) {
    return this.catAttRepository.createQueryBuilder('categoriesAttribute')
    .leftJoinAndSelect('categoriesAttribute.categoryId', 'categoryId')
    .leftJoinAndSelect('categoriesAttribute.attributeId', 'attributeId')
    .where('categoriesAttribute.attributeId = :id', {id})
    .getMany();
  }

  async update(id: number, updateCategoriesAttributeDto: UpdateCategoriesAttributeDto) {
    try {
      await this.catAttRepository.update({id: id}, updateCategoriesAttributeDto);
      throw 'Categories Attribute Successfully Updated!';
    } catch (exception) {
      return exception;
    }
  }

  async remove(id: number) {
    try {
      await this.catAttRepository.delete({id: id});
      throw 'Categories Attribute Successfully Deleted!';
    } catch (exception) {
      return exception;
    }
  }
}
