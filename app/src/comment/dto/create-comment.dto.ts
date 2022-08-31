import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  @ApiProperty()
  boardId: number;

  @IsNumber()
  @ApiProperty()
  commentId?: number;

  @IsString()
  @ApiProperty()
  content: string;

  @IsString()
  @ApiProperty()
  author: string;
}
