import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../base/base.service';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {
    super(userRepo);
  }
}
