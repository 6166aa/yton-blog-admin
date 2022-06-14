import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Like } from 'typeorm';
import { QueryPaginatedDto } from '../queryPaginated.dto';

@Injectable()
export class QueryPipe<TEntity> implements PipeTransform<QueryPaginatedDto<TEntity>> {
  entity: TEntity;
  constructor(entity: new () => TEntity) {
    this.entity = new entity();
  }
  async transform(value: QueryPaginatedDto<any>, { metatype }: ArgumentMetadata) {
    Object.keys(value).forEach((key) => {
      if (key in this.entity) {
        if (value.q) {
          value.q[key] = value[key];
          delete value[key];
        } else {
          value.q = {};
          value.q[key] = value[key];
          delete value[key];
        }
        const reg = /\*(.+)\*/;
        if (typeof value.q[key] === 'string' && reg.test(value.q[key])) {
          value.q[key] = Like(value.q[key].replace('%', '\\%').replace(reg, '%$1%'));
        }
      }
    });
    const object = plainToClass(metatype, value);
    return object;
  }
}
