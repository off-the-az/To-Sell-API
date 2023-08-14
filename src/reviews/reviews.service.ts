import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {

  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>
  ){}

  async create(createReviewDto: CreateReviewDto) {
    try {
      const review = await this.reviewRepository.create(
        {
          ...createReviewDto
        }
      );
      throw await this.reviewRepository.save(review);
    } catch (exception) {
      return exception;
    }
  }

  async findAll() {
    return await this.reviewRepository.createQueryBuilder('reviews')
    .leftJoinAndSelect('reviews.userId', 'users.id')
    .leftJoinAndSelect('reviews.productId', 'products.id')
    .where('1')
    .getMany();
  }

  async findOne(id: number) {
    return await this.reviewRepository.createQueryBuilder('reviews')
    .leftJoinAndSelect('reviews.userId', 'users.id')
    .leftJoinAndSelect('reviews.productId', 'products.id')
    .where('reviews.id = :id', {id})
    .getOne();
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    try {
      await this.reviewRepository.update({id: id}, updateReviewDto);
      throw 'Review`s info updated successfully!'
    } catch (exception) {
      return exception;
    }
  }

  async remove(id: number) {
    try {
      await this.reviewRepository.delete({id: id});
      throw 'Review`s info deleted successfully!'
    } catch (exception) {
      return exception;
    }
  }
}
