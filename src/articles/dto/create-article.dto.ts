import { OmitType, PickType } from '@nestjs/swagger';
import { Article } from '../entities/article.entity';

export class CreateArticleDto extends OmitType(Article, ['author', 'category', 'tags'] as const) {}
