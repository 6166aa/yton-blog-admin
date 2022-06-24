import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { User } from '../entities/user.entity';

export class LoginDto extends PickType(User, ['username'] as const) {
  @Expose()
  @ApiProperty()
  password: string;
}
