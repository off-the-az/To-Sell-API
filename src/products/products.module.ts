import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsCategoryModule } from 'src/products-category/products-category.module';
import { CategoriesAttributeModule } from 'src/categories-attribute/categories-attribute.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), ProductsCategoryModule, CategoriesAttributeModule],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
