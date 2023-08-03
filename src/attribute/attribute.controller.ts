import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/users-role/decorators/users-role.decorator';
import { Role } from 'src/users-role/constants/users-role.enum';

@UseGuards(AuthGuard)
@Roles(Role.Admin)
@Controller('api/attribute')
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @Post()
  async create(@Body() createAttributeDto: CreateAttributeDto) {
    return await this.attributeService.create(createAttributeDto);
  }

  @Get()
  async findAll() {
    return await this.attributeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.attributeService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAttributeDto: UpdateAttributeDto,
  ) {
    return await this.attributeService.update(+id, updateAttributeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.attributeService.remove(+id);
  }
}
