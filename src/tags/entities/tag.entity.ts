import { BaseEntity } from '@base/base.entity';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
@Entity()
@ApiExtraModels()
export class Tag extends BaseEntity {
  @ApiProperty()
  @Column('nvarchar', { length: 20, unique: true })
  name: string = undefined;
}
