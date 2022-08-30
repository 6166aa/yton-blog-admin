import { validateHash } from '@/common/tools/hash.tool';
import { User } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ username });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    const isOK = await validateHash(password, user.password);
    if (!isOK) {
      throw new UnauthorizedException('Password is not correct!');
    }
    return user;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
