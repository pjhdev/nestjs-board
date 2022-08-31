import { ApiPropertyOptional} from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { PageRequestDto } from '../../shared/dtos/page-request.dto';

export class FindCommentDto extends PageRequestDto {
  @ApiPropertyOptional({ example: 'board id'})
  @IsNumber()
  boardId: number = 0;
}
