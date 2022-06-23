import { QueryPaginatedDto } from '@/base/dtos/query-paginated.dto';
import { ApiExtraModels, PartialType, IntersectionType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
@ApiExtraModels(QueryPaginatedDto)
export class QueryCategoryDto extends IntersectionType(PartialType(CreateCategoryDto), QueryPaginatedDto) {
  where: { [K in keyof CreateCategoryDto]: CreateCategoryDto[K] | string };
}
