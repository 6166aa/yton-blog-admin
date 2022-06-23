import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CreateBaseDto } from './types/CreateBaseDto';
import { PageQueryDto } from './types/PageQueryDto';
import { UpdateBaseDto } from './types/UpdateBaseDto';

@Injectable()
export class BaseService<TEntity extends BaseEntity> {
  constructor(private repo: Repository<BaseEntity>) {}
  async create(createBaseDto: CreateBaseDto<TEntity>) {
    const entity = this.repo.create(createBaseDto);
    return this.repo.save(entity);
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

  findOne(id: string) {
    return this.repo.findOneByOrFail({ id: id });
  }

  update(id: string, updateBaseDto: UpdateBaseDto<TEntity>) {
    return this.repo.update(id, updateBaseDto);
  }

  remove(id: string) {
    return this.repo.softDelete(id);
  }
}
