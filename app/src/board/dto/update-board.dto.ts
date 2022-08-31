import {ApiProperty, PickType} from '@nestjs/swagger';
import { CreateBoardDto } from './create-board.dto';
import { IsNumber } from 'class-validator';

export class UpdateBoardDto extends PickType(CreateBoardDto, ['content', 'password']) {
  @ApiProperty({ example: 'number' })
  @IsNumber()
  id: number;
}
