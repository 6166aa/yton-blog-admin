import { CreateBaseDto } from './create-base.dto';

export type UpdateBaseDto<TEntity> = Partial<CreateBaseDto<TEntity>>;
