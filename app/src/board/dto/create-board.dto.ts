import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateBoardDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsString()
  author: string;

  @ApiProperty()
  @IsString()
  password: string;
}
