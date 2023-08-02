import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private newsRepository: Repository<News>,
  ) {}
  async create(createNewsDto: CreateNewsDto) {
    try {
      const newNew = this.newsRepository.create({
        ...createNewsDto,
      });
      throw await this.newsRepository.save(newNew);
    } catch (exception) {
      return exception;
    }
  }

  async findAll() {
    return await this.newsRepository.find();
  }

  async findOne(id: number) {
    return await this.newsRepository.findOneBy({ id: id });
  }

  async update(id: number, updateNewsDto: UpdateNewsDto) {
    return await this.newsRepository.update({ id: id }, updateNewsDto);
  }

  async remove(id: number) {
    return await this.newsRepository.delete({ id: id });
  }
}
