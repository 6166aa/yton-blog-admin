import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../base/base.service';
import { Tag } from './entities/tag.entity';
@Injectable()
export class TagsService extends BaseService<Tag> {
  constructor(
    @InjectRepository(Tag)
    private tagRepo: Repository<Tag>,
  ) {
    super(tagRepo);
  }
}
