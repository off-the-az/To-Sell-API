import { PartialType } from '@nestjs/swagger';
import { CreateCategoriesAttributeDto } from './create-categories-attribute.dto';

export class UpdateCategoriesAttributeDto extends PartialType(CreateCategoriesAttributeDto) {}
