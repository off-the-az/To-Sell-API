import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsCategoryModule } from 'src/products-category/products-category.module';
import { CategoriesAttributeModule } from 'src/categories-attribute/categories-attribute.module';
import { FileManagerModule } from 'src/file-manager/file-manager.module';
import { ProductsPhotoListModule } from 'src/products-photo-list/products-photo-list.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), ProductsCategoryModule, CategoriesAttributeModule, FileManagerModule, ProductsPhotoListModule],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
