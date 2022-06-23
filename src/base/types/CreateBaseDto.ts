import { BaseEntity } from '../base.entity';

export type CreateBaseDto<TEntity> = {
  [K in keyof TEntity as K extends keyof BaseEntity ? never : K]: TEntity[K];
} & Partial<BaseEntity>;
