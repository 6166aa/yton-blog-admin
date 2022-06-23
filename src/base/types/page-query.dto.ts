import { FindOptionsWhere } from 'typeorm';
import { CreateBaseDto } from './create-base.dto';

export type PageQueryDto<TEntity> = Partial<CreateBaseDto<TEntity>> & {
  page?: number;
  size?: number;
  where: FindOptionsWhere<TEntity>;
};
