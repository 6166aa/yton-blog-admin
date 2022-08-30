import { CaslAbilityFactory } from '@/casl/casl-ability.factory';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class CommonAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector, private caslAbilityFactory: CaslAbilityFactory) {
    super();
  }
  canActivate(context: ExecutionContext) {
    debugger;
    const { user } = context.switchToHttp().getRequest();
    const ability = this.caslAbilityFactory.createForUser(user);

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // 可以抛出一个基于info或者err参数的异常
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
