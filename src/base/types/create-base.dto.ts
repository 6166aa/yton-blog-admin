import { DeepPartial } from 'typeorm';

export type CreateBaseDto<TEntity> = DeepPartial<TEntity>;
