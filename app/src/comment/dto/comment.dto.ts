import { PickType } from '@nestjs/swagger';
import { Comment } from '../entities/comment.entity';
import { fromEntity } from '../../shared/utils/dto.utils';

export class CommentDto extends PickType(Comment, [
  'id',
  'content',
  'author',
  'createdAt',
] as const) {
  static fromEntity(entity: Comment): CommentDto {
    return <CommentDto>fromEntity<CommentDto>(CommentDto, entity);
  }

  static fromEntities(entities: Comment[]): CommentDto[] {
    return <CommentDto[]>fromEntity<CommentDto>(CommentDto, entities);
  }
}
