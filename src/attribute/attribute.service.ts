import { Injectable } from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attribute } from './entities/attribute.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttributeService {

  constructor(
    @InjectRepository(Attribute) private attributeRepository : Repository<Attribute>,
  ){}

  async create(createAttributeDto: CreateAttributeDto) {
    try {
      const attribute = await this.attributeRepository.create({
        ...createAttributeDto,
      });
      throw await this.attributeRepository.save(attribute);
    } catch (exception) {
      return exception;
    }
  }

  async findAll() {
    return await this.attributeRepository.find();
  }

  async findOne(id: number) {
    return await this.attributeRepository.findOneBy({id: id});
  }

  async update(id: number, updateAttributeDto: UpdateAttributeDto) {
    try {
      await this.attributeRepository.update({id: id}, updateAttributeDto);
      throw 'Attribute updated!'
    } catch (exception) {
      return exception
    }
  }

  async remove(id: number) {
    try {
      await this.attributeRepository.delete({id: id});
      throw 'Attribute deleted!'
    } catch (exception) {
      return exception;
    }
  }
}
