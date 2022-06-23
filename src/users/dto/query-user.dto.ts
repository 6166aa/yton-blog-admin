import { QueryPaginatedDto } from '@/base/dtos/query-paginated.dto';
import { PartialType, IntersectionType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
export class QueryUserDto extends IntersectionType(PartialType(CreateUserDto), QueryPaginatedDto) {
  where: { [K in keyof CreateUserDto]: CreateUserDto[K] };
}
