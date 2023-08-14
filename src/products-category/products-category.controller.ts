import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsCategoryService } from './products-category.service';
import { CreateProductsCategoryDto } from './dto/create-products-category.dto';
import { UpdateProductsCategoryDto } from './dto/update-products-category.dto';

@Controller('api/products-category')
export class ProductsCategoryController {
  constructor(private readonly productsCategoryService: ProductsCategoryService) {}

  @Post()
  create(@Body() createProductsCategoryDto: CreateProductsCategoryDto) {
    return this.productsCategoryService.create(createProductsCategoryDto);
  }

  @Get()
  findAll() {
    return this.productsCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductsCategoryDto: UpdateProductsCategoryDto) {
    return this.productsCategoryService.update(+id, updateProductsCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsCategoryService.remove(+id);
  }
}
