import { QueryPaginatedDto } from '@/base/dtos/query-paginated.dto';
import { ApiExtraModels, PartialType, IntersectionType } from '@nestjs/swagger';
import { CreateArticleDto } from './create-article.dto';
@ApiExtraModels(QueryPaginatedDto)
export class QueryArticleDto extends IntersectionType(PartialType(CreateArticleDto), QueryPaginatedDto) {
  where: { [K in keyof CreateArticleDto]: CreateArticleDto[K] };
}
