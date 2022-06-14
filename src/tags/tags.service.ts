import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { BaseService } from '../base/base.service';
import { Tag } from './entities/tag.entity';
@Injectable()
export class TagsService extends BaseService {
  constructor(
    @InjectRepository(Tag)
    private tagRepo: Repository<Tag>,
  ) {
    super(tagRepo);
  }
  test() {
    this.tagRepo.find({
      where: {
        name: 'test',
      },
    });
  }
}
