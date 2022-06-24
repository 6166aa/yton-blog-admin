import { Article } from '@/articles/entities/article.entity';
import { BaseEntity } from '@base/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { Column, Entity, ManyToMany } from 'typeorm';
@Entity()
export class Tag extends BaseEntity {
  @ApiProperty()
  @Column('nvarchar', { length: 20, unique: true })
  @IsString()
  @Expose()
  name: string;

  @ManyToMany(() => Article, (article) => article.tags)
  articles: Article[];
}
