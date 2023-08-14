import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsPhotoListService } from './products-photo-list.service';
import { CreateProductsPhotoListDto } from './dto/create-products-photo-list.dto';
import { UpdateProductsPhotoListDto } from './dto/update-products-photo-list.dto';

@Controller('api/products-photo-list')
export class ProductsPhotoListController {
  constructor(private readonly productsPhotoListService: ProductsPhotoListService) {}

  @Post()
  create(@Body() createProductsPhotoListDto: CreateProductsPhotoListDto) {
    return this.productsPhotoListService.create(createProductsPhotoListDto);
  }

  @Get()
  findAll() {
    return this.productsPhotoListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsPhotoListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductsPhotoListDto: UpdateProductsPhotoListDto) {
    return this.productsPhotoListService.update(+id, updateProductsPhotoListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsPhotoListService.remove(+id);
  }
}
