import { PipeTransform, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Like } from 'typeorm';
import { QueryPaginatedDto } from '../dtos/query-paginated.dto';
import { PageQueryDto } from '../types/page-query.dto';

@Injectable()
export class QueryPipe<TEntity> implements PipeTransform<PageQueryDto<TEntity>> {
  entityCtor: new () => TEntity;
  constructor(entity: new () => TEntity) {
    this.entityCtor = entity;
  }
  async transform(value: PageQueryDto<TEntity>) {
    const entity = plainToClass(this.entityCtor, value, { strategy: 'excludeAll' });
    const queryInfo = plainToClass(QueryPaginatedDto, value, { strategy: 'excludeAll' });
    const queryDto = {
      ...queryInfo,
      where: {},
    };
    queryDto.where = {};
    Object.keys(entity)
      .filter(Boolean)
      .forEach((key) => {
        const reg = /\*(.+)\*/;
        if (typeof entity[key] === 'string' && reg.test(entity[key])) {
          queryDto.where[key] = Like(entity[key].replace('%', '\\%').replace(reg, '%$1%'));
          return;
        }
        queryDto.where[key] = entity[key];
      });
    return queryDto;
  }
}
