import { Article } from '@/articles/entities/article.entity';
import { Role } from '@/common/enums/role.enum';
import { Tag } from '@/tags/entities/tag.entity';
import { User } from '@/users/entities/user.entity';
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Action } from './action.enum';

type Subjects = InferSubjects<typeof Article | typeof Tag | typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(Ability as AbilityClass<AppAbility>);

    if (user.role === Role.superAdmin) {
      can(Action.Manage, 'all'); // read-write access to everything
    }

    if (user.role === Role.admin) {
      can(Action.Manage, 'all', { createAt: user.username });
    }

    can(Action.Read, 'all');

    return build({
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
