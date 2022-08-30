import { DefaultValue } from '@/base/decorators/defaultValue.decorator';
import { Role } from '@/common/enums/role.enum';
import { BaseEntity } from '@base/base.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsBoolean, IsEmail, IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import hashStr from '@/common/tools/hash.tool';
import { Article } from '@/articles/entities/article.entity';
@Entity()
export class User extends BaseEntity {
  @ApiProperty()
  @Column('nvarchar', { length: 20, unique: true })
  @IsString()
  @Expose()
  name: string;

  @ApiProperty()
  @Column('nvarchar', { length: 20, unique: true })
  @IsString()
  @Expose()
  username: string;

  @Column('nvarchar', { length: 80, nullable: false })
  @IsString()
  @ApiProperty()
  @Exclude()
  password: string;

  @Column('nvarchar', { length: 12, default: Role.guest })
  @IsEnum(Role)
  @Expose()
  @ApiProperty({ enum: Role })
  @IsOptional()
  role: Role;

  @Column('nvarchar', { length: 12, default: true })
  @IsBoolean()
  @Expose()
  @ApiPropertyOptional({ type: 'boolean' })
  @IsOptional()
  @Type(() => Boolean)
  status: boolean;

  @Column('nvarchar', { length: 32 })
  @IsString()
  @IsOptional()
  @Expose()
  tempCode: string;

  @Column('nvarchar', { length: 32, unique: true, nullable: true })
  @IsEmail()
  @Expose()
  @IsOptional()
  @ApiPropertyOptional()
  email?: string;

  @Column('nvarchar', { length: 32, unique: true, nullable: true })
  @IsUrl()
  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  website?: string;

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];

  @BeforeInsert()
  async beforeInsert() {
    this.password = await hashStr(this.password);
  }
}
