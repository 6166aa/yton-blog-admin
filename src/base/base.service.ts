import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CreateBaseDto } from './create-base.dto';
import { QueryPaginatedDto } from './queryPaginated.dto';
import { UpdateBaseDto } from './update-base.dto';

@Injectable()
export class BaseService {
  constructor(private repo: Repository<BaseEntity>) {}
  create(createBaseDto: CreateBaseDto) {
    return this.repo.insert(createBaseDto);
  }

  async findAll(queryPaginatedDto: QueryPaginatedDto<BaseEntity>) {
    const [data, total] = await this.repo.findAndCount({
      skip: queryPaginatedDto.pageSize * (queryPaginatedDto.page - 1),
      take: queryPaginatedDto.pageSize,
      where: queryPaginatedDto.q,
    });
    return {
      page: queryPaginatedDto.page,
      pageSize: queryPaginatedDto.pageSize,
      data,
      total,
    };
  }

  findOne(id: string) {
    return this.repo.findOneByOrFail({ id: id });
  }

  update(id: string, updateBaseDto: UpdateBaseDto) {
    return this.repo.update(id, updateBaseDto);
  }

  remove(id: string) {
    return this.repo.softDelete(id);
  }
}
