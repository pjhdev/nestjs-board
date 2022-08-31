import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class Response {
  @ApiProperty({ example: true })
  private isSuccess: boolean = true;
  /*@ApiProperty({ example: HttpStatus.OK })
  private status: HttpStatus = HttpStatus.OK;*/
  @ApiProperty()
  private data?: any;

  constructor(data?: any) {
    this.data = data;
  }
}
