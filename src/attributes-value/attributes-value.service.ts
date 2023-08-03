import { Injectable } from '@nestjs/common';
import { CreateAttributesValueDto } from './dto/create-attributes-value.dto';
import { UpdateAttributesValueDto } from './dto/update-attributes-value.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AttributesValue } from './entities/attributes-value.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttributesValueService {
  
  constructor(
    @InjectRepository(AttributesValue) private attrValueReopository: Repository<AttributesValue>
  ){}

  async findOneById(id: number) {
    try {
      throw await this.attrValueReopository.createQueryBuilder('attributesValue')
      .leftJoinAndSelect('attributesValue.attributeId', 'attributeId')
      .where('attributesValue.id = :id', {id})
      .getOne()
    } catch (exception) {
      return exception;
    }
  }
  async findOneByAttr(attributeId: number) {
    try {
      throw await this.attrValueReopository.createQueryBuilder('attributesValue')
      .leftJoinAndSelect('attributesValue.attributeId', 'attributeId')
      .where('attributesValue.attributeId = :attributeId', {attributeId})
      .getOne()
    } catch (exception) {
      return exception;
    }
  }
  async create(createAttributesValueDto: CreateAttributesValueDto) {
    try {
      const attrValue = await this.attrValueReopository.create(
        {
          ...createAttributesValueDto,
        }
      );
      throw await this.attrValueReopository.save(attrValue);
    } catch (exception) {
      return exception;
    }
  }

  async findAll() {
    try {
      throw await this.attrValueReopository.createQueryBuilder('attributesValue')
      .leftJoinAndSelect('attributesValue.attributeId', 'attributeId')
      .getMany()
    } catch (exception) {
      return exception;
    }
  }

  async update(id: number, updateAttributesValueDto: UpdateAttributesValueDto) {
    try {
      await this.attrValueReopository.update({id: id}, updateAttributesValueDto);
      throw 'Attribute`s Value Updated!'
    } catch (exception) {
      return exception;
    }
  }

  async remove(id: number) {
    try {
      await this.attrValueReopository.delete({id: id});
      throw 'Attribute`s Value Deleted!'
    } catch (exception) {
      return exception;
    }
  }
}
