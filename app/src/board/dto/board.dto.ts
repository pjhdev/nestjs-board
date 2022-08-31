import { OmitType } from '@nestjs/swagger';
import { Board } from '../entities/board.entity';
import { fromEntity } from '../../shared/utils/dto.utils';

export class BoardDto extends OmitType(Board, ['password'] as const) {
  static fromEntity(entity: Board): BoardDto {
    return <BoardDto>fromEntity<BoardDto>(BoardDto, entity);
  }

  static fromEntities(entities: Board[]): BoardDto[] {
    return <BoardDto[]>fromEntity<BoardDto>(BoardDto, entities);
  }
}
