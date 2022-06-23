import { OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { User } from '../entities/user.entity';

export class ReturnUserDto extends OmitType(User, ['hashPassword', 'password'] as const) {
  @Exclude()
  password: string;
}
