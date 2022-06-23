import { FindOptionsWhere } from 'typeorm';
import { CreateBaseDto } from './CreateBaseDto';

export type PageQueryDto<TEntity> = Partial<CreateBaseDto<TEntity>> & {
  page?: number;
  size?: number;
  where: FindOptionsWhere<TEntity>;
};
