import { PartialType } from '@nestjs/mapped-types';
import { BaseEntity } from './base.entity';

export class CreateBaseDto extends PartialType(BaseEntity) {}
