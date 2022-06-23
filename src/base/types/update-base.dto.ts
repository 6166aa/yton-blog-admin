import { BaseEntity } from '../base.entity';

export type UpdateBaseDto<TEntity> = {
  [K in keyof TEntity as K extends keyof BaseEntity ? never : K]: TEntity[K];
} & Partial<BaseEntity>;
