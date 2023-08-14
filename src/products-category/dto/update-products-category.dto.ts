import { PartialType } from '@nestjs/swagger';
import { CreateProductsCategoryDto } from './create-products-category.dto';

export class UpdateProductsCategoryDto extends PartialType(CreateProductsCategoryDto) {}
