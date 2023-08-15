import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProductsCategoryService } from './products-category.service';
import { CreateProductsCategoryDto } from './dto/create-products-category.dto';
import { UpdateProductsCategoryDto } from './dto/update-products-category.dto';
import { Roles } from 'src/users-role/decorators/users-role.decorator';
import { Role } from 'src/users-role/constants/users-role.enum';

@Controller('api/products-category')
export class ProductsCategoryController {
  constructor(private readonly productsCategoryService: ProductsCategoryService) {}
  @Roles(Role.Seller)
  @Post()
  create(@Body() createProductsCategoryDto: CreateProductsCategoryDto) {
    return this.productsCategoryService.create(createProductsCategoryDto);
  }
  @Roles(Role.User, Role.Seller)
  @Get()
  findAll() {
    return this.productsCategoryService.findAll();
  }
  @Roles(Role.User, Role.Seller)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsCategoryService.findOne(+id);
  }
  @Roles(Role.Seller)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductsCategoryDto: UpdateProductsCategoryDto) {
    return this.productsCategoryService.update(+id, updateProductsCategoryDto);
  }
  @Roles(Role.Seller)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsCategoryService.remove(+id);
  }
}
