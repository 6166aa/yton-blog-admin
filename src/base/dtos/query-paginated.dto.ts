import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsEmpty, IsNumber, IsNumberString, IsOptional, ValidateIf } from 'class-validator';
import { DefaultValue } from '../decorators/defaultValue.decorator';

export class QueryPaginatedDto {
  @ApiPropertyOptional({ default: 10 })
  @DefaultValue(10)
  @Expose()
  @IsNumber()
  @Type(() => Number)
  size?: number;

  @ApiPropertyOptional({ default: 1 })
  @DefaultValue(1)
  @Expose()
  @IsNumber()
  @Type(() => Number)
  page?: number;
}
