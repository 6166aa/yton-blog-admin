import { validateHash } from '@/common/tools/hash.tool';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

  async login(username: string, password: string) {
    const user = await this.userRepo.findOneBy({ username });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    const isOK = await validateHash(password, user.password);
    if (!isOK) {
      throw new UnauthorizedException('Password is not correct!');
    }
    return user;
  }
}
