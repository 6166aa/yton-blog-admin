import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CreateBaseDto } from './types/create-base.dto';
import { PageQueryDto } from './types/page-query.dto';
import { UpdateBaseDto } from './types/update-base.dto';

@Injectable()
export class BaseService<TEntity extends BaseEntity> {
  constructor(private repo: Repository<BaseEntity>) {}

  async create(createBaseDto: CreateBaseDto<TEntity>): Promise<TEntity> {
    const entity = this.repo.create(createBaseDto);
    return this.repo.save(entity) as Promise<TEntity>;
  }

  async findAll(queryPaginatedDto: PageQueryDto<TEntity>) {
    const [data, total] = await this.repo.findAndCount({
      skip: queryPaginatedDto.size * (queryPaginatedDto.page - 1),
      take: queryPaginatedDto.size,
      where: queryPaginatedDto.where as any,
    });
    return {
      page: queryPaginatedDto.page,
      pageSize: queryPaginatedDto.size,
      data,
      total,
    };
  }

  findOne(id: string): Promise<TEntity> {
    return this.repo.findOneByOrFail({ id: id }) as Promise<TEntity>;
  }

  update(id: string, updateBaseDto: UpdateBaseDto<TEntity>) {
    return this.repo.update(id, updateBaseDto);
  }

  remove(id: string) {
    return this.repo.softDelete(id);
  }
}
