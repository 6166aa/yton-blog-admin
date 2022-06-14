import { PartialType } from '@nestjs/mapped-types';
import { BaseEntity } from './base.entity';

export class UpdateBaseDto extends PartialType(BaseEntity) {}
