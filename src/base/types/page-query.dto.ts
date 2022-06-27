import { FindOptionsOrder, FindOptionsRelations, FindOptionsWhere } from 'typeorm';
import { CreateBaseDto } from './create-base.dto';

export type PageQueryDto<TEntity> = {
  [K in keyof Partial<CreateBaseDto<TEntity>>]: TEntity[K] | object;
} & {
  page?: number;
  size?: number;
  where: FindOptionsWhere<TEntity>;
  order?: FindOptionsOrder<TEntity>;
  relations?: FindOptionsRelations<TEntity>;
};
