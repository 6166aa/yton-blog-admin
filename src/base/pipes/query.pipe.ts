import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Equal, In, LessThan, LessThanOrEqual, Like, MoreThan, MoreThanOrEqual, Not } from 'typeorm';
import { QueryPaginatedDto } from '../dtos/query-paginated.dto';
import { PageQueryDto } from '../types/page-query.dto';

const opMap = {
  like: Like,
  nlike: (v) => Not(Like(v)),
  eq: Equal,
  neq: (v) => Not(Equal(v)),
  gt: MoreThan,
  ge: MoreThanOrEqual,
  lt: LessThan,
  le: LessThanOrEqual,
  in: (v) => In(v.split(',')),
};

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
      page: queryInfo.page,
      size: queryInfo.size,
      where: {},
      order: null,
      relations: null,
    };
    Object.keys(entity)
      .filter(Boolean)
      .forEach((key) => {
        const reg = /\[(?<op>.+)\](?<value>.+)/;
        if (typeof entity[key] === 'string' && reg.test(entity[key])) {
          const r = entity[key].match(reg);
          const { op, value } = r.groups;
          if (op in opMap) {
            queryDto.where[key] = opMap[op](value);
            return;
          }
          throw new BadRequestException('error query parameter: ' + key);
        }
        queryDto.where[key] = entity[key];
      });
    if (queryInfo.sort) {
      if (!/(?<op>[+-])(?<field>\w+)/.test(queryInfo.sort)) {
        throw new BadRequestException('error query parameter: ' + queryInfo.sort);
      }
      queryDto.order = {};
      queryInfo.sort.split(',').forEach((sort) => {
        const { op, field } = sort.match(/(?<op>[+-])(?<field>\w+)/).groups;
        queryDto.order[field] = op === '+' ? 1 : -1;
      });
    }
    if (queryInfo.relations) {
      queryDto.relations = queryInfo.relations.split(',');
    }
    return queryDto;
  }
}
