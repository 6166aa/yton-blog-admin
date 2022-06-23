import { ApiProperty } from '@nestjs/swagger';

export class ReturnValue<TResult> {
  @ApiProperty()
  code: number;
  @ApiProperty()
  message: string;
  @ApiProperty()
  data: TResult;
}
