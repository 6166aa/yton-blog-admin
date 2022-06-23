import { DefaultValue } from '@/base/decorators/defaultValue.decorator';
import { Role } from '@/common/enums/role.enum';
import { BaseEntity } from '@base/base.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsEmail, IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { BeforeInsert, Column, Entity } from 'typeorm';
import hashStr from '@/common/tools/hash.tool';
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

  @Column('nvarchar', { length: 40, nullable: false })
  @IsString()
  @ApiProperty()
  @Expose()
  password: string;

  @Column('nvarchar', { length: 12 })
  @IsEnum(Role)
  @Expose()
  @ApiProperty({ enum: Role })
  @DefaultValue('guest')
  role: Role;

  @Column('nvarchar', { length: 12 })
  @IsBoolean()
  @Expose()
  @ApiPropertyOptional({ type: 'boolean' })
  @DefaultValue(true)
  @Type(() => Boolean)
  status: boolean;

  @Column('nvarchar', { length: 32 })
  @IsString()
  @IsOptional()
  @Expose()
  tempCode: string;

  @Column('nvarchar', { length: 32, unique: true })
  @IsEmail()
  @Expose()
  @IsOptional()
  @ApiPropertyOptional()
  email?: string;

  @Column('nvarchar', { length: 32, unique: true })
  @IsUrl()
  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  website?: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hashStr(this.password);
    console.log('hash后的密码：' + this.password);
  }
}
