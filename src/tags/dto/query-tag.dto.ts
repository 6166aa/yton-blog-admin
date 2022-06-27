import { QueryPaginatedDto } from '@/base/dtos/query-paginated.dto';
import { ApiExtraModels, PartialType, IntersectionType } from '@nestjs/swagger';
import { CreateTagDto } from './create-tag.dto';
@ApiExtraModels(QueryPaginatedDto)
export class QueryTagDto extends IntersectionType(PartialType(CreateTagDto), QueryPaginatedDto) {
  where: { [K in keyof CreateTagDto]: CreateTagDto[K] };
}
