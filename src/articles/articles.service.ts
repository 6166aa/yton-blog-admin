import { BaseService } from '@/base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService extends BaseService<Article> {
  constructor(
    @InjectRepository(Article)
    private tagRepo: Repository<Article>,
  ) {
    super(tagRepo);
  }
}
