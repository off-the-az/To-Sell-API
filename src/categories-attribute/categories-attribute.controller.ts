import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CategoriesAttributeService } from './categories-attribute.service';
import { CreateCategoriesAttributeDto } from './dto/create-categories-attribute.dto';
import { UpdateCategoriesAttributeDto } from './dto/update-categories-attribute.dto';

@Controller('categories-attribute')
export class CategoriesAttributeController {
  constructor(private readonly categoriesAttributeService: CategoriesAttributeService) {}

  @Post()
  async create(@Body() createCategoriesAttributeDto: CreateCategoriesAttributeDto) {
    return await this.categoriesAttributeService.create(createCategoriesAttributeDto);
  }

  @Get()
  async findAll() {
    return await this.categoriesAttributeService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return await this.categoriesAttributeService.findOneById(+id);
  }

  @Get('byCategory/:id')
  async findOneByCategoryId(@Param('id') id: string) {
    return await this.categoriesAttributeService.findOneByCategoryId(+id);
  }

  @Get('byAttribute/:id')
  async findOneByAttributeId(@Param('id') id: string) {
    return await this.categoriesAttributeService.findOneByAttributeId(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCategoriesAttributeDto: UpdateCategoriesAttributeDto) {
    return await this.categoriesAttributeService.update(+id, updateCategoriesAttributeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.categoriesAttributeService.remove(+id);
  }
}
