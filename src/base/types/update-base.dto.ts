import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export type UpdateBaseDto<TEntity> = QueryDeepPartialEntity<TEntity>;
