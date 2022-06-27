import { BadRequestException, HttpCode, Injectable } from '@nestjs/common';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CreateBaseDto } from './types/create-base.dto';
import { PageQueryDto } from './types/page-query.dto';
import { UpdateBaseDto } from './types/update-base.dto';

@Injectable()
export class BaseService<TEntity extends BaseEntity> {
  constructor(private repo: Repository<TEntity>) {}

  async create(createBaseDto: CreateBaseDto<TEntity>): Promise<TEntity> {
    const entity = this.repo.create(createBaseDto);
    return this.repo.save(entity);
  }

  async findAll(queryPaginatedDto: PageQueryDto<TEntity>) {
    const opt: FindManyOptions<TEntity> = {
      skip: queryPaginatedDto.size * (queryPaginatedDto.page - 1),
      take: queryPaginatedDto.size,
      where: queryPaginatedDto.where,
    };
    if (queryPaginatedDto.order) {
      opt.order = queryPaginatedDto.order;
    }
    if (queryPaginatedDto.relations) {
      opt.relations = queryPaginatedDto.relations;
    }
    const [data, total] = await this.repo.findAndCount(opt);
    return {
      page: queryPaginatedDto.page,
      pageSize: queryPaginatedDto.size,
      data,
      total,
    };
  }

  findOne(opt: FindOptionsWhere<TEntity>): Promise<TEntity> {
    return this.repo.findOneBy(opt);
  }

  async update(id: string, updateBaseDto: UpdateBaseDto<TEntity>) {
    const res = await this.repo.update(id, updateBaseDto);
    if (!res.affected) {
      throw new BadRequestException(`entity(id:${id}) is not found`);
    }
    return 'update ok';
  }

  async remove(id: string) {
    const res = await this.repo.softDelete(id);
    if (!res.affected) {
      throw new BadRequestException(`entity(id:${id}) is not found`);
    }
    return 'delete ok';
  }
}
