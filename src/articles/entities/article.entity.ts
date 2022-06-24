import { DefaultValue } from '@/base/decorators/defaultValue.decorator';
import { Category } from '@/categories/entities/category.entity';
import { ArticlePerm } from '@/common/enums/article-perm.enum';
import { Role } from '@/common/enums/role.enum';
import { Tag } from '@/tags/entities/tag.entity';
import { User } from '@/users/entities/user.entity';
import { BaseEntity } from '@base/base.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsDateString, IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
@Entity()
export class Article extends BaseEntity {
  @ApiProperty()
  @Column('nvarchar', { length: 40, unique: true })
  @IsString()
  @Expose()
  title: string;

  @ApiProperty()
  @Column({ default: false })
  @IsBoolean()
  @Expose()
  isShow: boolean;

  @ApiProperty()
  @Column('text')
  @IsString()
  @Expose()
  content: string;

  @ApiPropertyOptional()
  @Column('text')
  @IsString()
  @IsOptional()
  @Expose()
  abstract: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  @IsUrl()
  @Expose()
  cover?: string;

  @Column({ nullable: true })
  @IsDateString()
  @IsOptional()
  @Expose()
  pubDate?: Date;

  @Column()
  @IsEnum(ArticlePerm)
  @ApiProperty({ default: ArticlePerm.publish })
  @Expose()
  @DefaultValue(ArticlePerm.publish)
  perm: ArticlePerm;

  @Column()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Expose()
  visitPassword?: string;

  @Column()
  @IsBoolean()
  @ApiProperty({ default: false })
  @Expose()
  showComment: boolean;

  @Column()
  @IsBoolean()
  @ApiProperty({ default: false })
  @Expose()
  allowComment: boolean;

  @ManyToOne(() => User, (user) => user.articles)
  @JoinColumn()
  author: User;

  @ManyToOne(() => Category, (cate) => cate.articles)
  @JoinColumn()
  category: Category;

  @ManyToMany(() => Tag, (tag) => tag.articles)
  @JoinTable()
  tags: Tag[];
}
