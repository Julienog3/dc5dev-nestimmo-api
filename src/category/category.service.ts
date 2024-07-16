import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.categoryRepository.create(createCategoryDto);
      return this.categoryRepository.save(category);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    return this.categoryRepository.createQueryBuilder('category').getMany();
  }

  findOne(id: number) {
    try {
      return this.categoryRepository
        .createQueryBuilder('category')
        .where('category.id = :id', { id: id })
        .getOne();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      return this.categoryRepository
        .createQueryBuilder('category')
        .where('category.id = :id', { id: id })
        .update(updateCategoryDto)
        .execute()
        .then((result) => {
          return result;
        });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  remove(id: number) {
    try {
      return this.categoryRepository
        .createQueryBuilder('category')
        .where('category.id = :id', { id: id })
        .delete()
        .execute();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
