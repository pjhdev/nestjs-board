import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class ExceptionDto {
  @ApiProperty({ example: false })
  private readonly isSuccess: boolean = false;
  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  private errorCode: any;
  @ApiProperty({ example: 'Bad request' })
  private errorMessage: any;

  constructor(partial: Partial<ExceptionDto>) {
    Object.assign(this, partial);
  }
}
