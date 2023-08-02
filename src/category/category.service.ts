import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
  ){}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.categoryRepository.create({
        ...createCategoryDto,
      });
      throw await this.categoryRepository.save(category);
    } catch (exception) {
      return exception;
    }
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOneBy({ id: id });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryRepository.update({id: id}, updateCategoryDto);
  }

  async remove(id: number) {
    return await this.categoryRepository.delete({id: id});
  }
}
