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
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from 'src/users-role/constants/users-role.enum';
import { Roles } from 'src/users-role/decorators/users-role.decorator';

@Controller('api/news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }
  @Get()
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  findAll() {
    return this.newsService.findAll();
  }
  @Get(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }
  @Put(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(+id, updateNewsDto);
  }
  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}
