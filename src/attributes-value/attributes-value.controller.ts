import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { AttributesValueService } from './attributes-value.service';
import { CreateAttributesValueDto } from './dto/create-attributes-value.dto';
import { UpdateAttributesValueDto } from './dto/update-attributes-value.dto';
import { Roles } from 'src/users-role/decorators/users-role.decorator';
import { Role } from 'src/users-role/constants/users-role.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('api/attr-value')
export class AttributesValueController {
  constructor(private readonly attributesValueService: AttributesValueService) {}

  @Roles(Role.Admin, Role.Seller)
  @Post()
  create(@Body() createAttributesValueDto: CreateAttributesValueDto) {
    return this.attributesValueService.create(createAttributesValueDto);
  }
  @Roles(Role.Admin, Role.Seller)
  @Get()
  findAll() {
    return this.attributesValueService.findAll();
  }
  @Roles(Role.Admin, Role.Seller)
  @Get('byId/:id')
  findOneById(@Param('id') id: string) {
    return this.attributesValueService.findOneById(+id);
  }

  @Get('byAttr/:id')
  findOneByAttribute(@Param('id') id: string) {
    return this.attributesValueService.findOneByAttr(+id);
  }

  @Roles(Role.Admin, Role.Seller)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateAttributesValueDto: UpdateAttributesValueDto) {
    return this.attributesValueService.update(+id, updateAttributesValueDto);
  }

  @Roles(Role.Admin, Role.Seller)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attributesValueService.remove(+id);
  }
}

