import { PickType } from '@nestjs/swagger';
import { UpdateBoardDto } from './update-board.dto';

export class RemoveBoardDto extends PickType(UpdateBoardDto, [
  'id',
  'password',
]) {}
