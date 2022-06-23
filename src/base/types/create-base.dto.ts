import { BaseEntity } from '../base.entity';

export type CreateBaseDto<TEntity> = {
  [K in keyof TEntity as K extends keyof BaseEntity
    ? never
    : TEntity[K] extends (...args: any[]) => any
    ? never
    : K]: TEntity[K];
} & Partial<BaseEntity>;
