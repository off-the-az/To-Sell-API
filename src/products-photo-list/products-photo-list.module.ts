import { Module } from '@nestjs/common';
import { ProductsPhotoListService } from './products-photo-list.service';
import { ProductsPhotoListController } from './products-photo-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsPhotoList } from './entities/products-photo-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    ProductsPhotoList
  ])],
  controllers: [ProductsPhotoListController],
  providers: [ProductsPhotoListService]
})
export class ProductsPhotoListModule {}
