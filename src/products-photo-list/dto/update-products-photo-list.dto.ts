import { PartialType } from '@nestjs/swagger';
import { CreateProductsPhotoListDto } from './create-products-photo-list.dto';

export class UpdateProductsPhotoListDto extends PartialType(CreateProductsPhotoListDto) {}
