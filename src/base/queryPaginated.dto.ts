import { ApiProperty } from '@nestjs/swagger';

export class QueryPaginatedDto<TEntity> {
  @ApiProperty()
  pageSize = 10;

  @ApiProperty()
  page = 1;

  q: QueryType<TEntity>;
}

type QueryType<T> = {
  [K in keyof T]: T[K];
};
