import { PartialType } from '@nestjs/swagger';
import { CreateTicketsProductListDto } from './create-tickets-product-list.dto';

export class UpdateTicketsProductListDto extends PartialType(CreateTicketsProductListDto) {}
