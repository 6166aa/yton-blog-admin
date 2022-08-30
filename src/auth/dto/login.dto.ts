import { User } from '@/users/entities/user.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoginDto extends PickType(User, ['username'] as const) {
  @Expose()
  @ApiProperty()
  password: string;
}
