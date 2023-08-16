import { Module } from '@nestjs/common';
import { CategoriesAttributeService } from './categories-attribute.service';
import { CategoriesAttributeController } from './categories-attribute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesAttribute } from './entities/categories-attribute.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriesAttribute])],
  controllers: [CategoriesAttributeController],
  providers: [CategoriesAttributeService],
  exports: [CategoriesAttributeService]
})
export class CategoriesAttributeModule {}
