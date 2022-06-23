import { PickType } from '@nestjs/swagger';
import { Tag } from '../entities/tag.entity';

export class UpdateTagDto extends PickType(Tag, ['name']) {}
