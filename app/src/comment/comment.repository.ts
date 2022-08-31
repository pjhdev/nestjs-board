import { DataSource, Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Injectable } from '@nestjs/common';
import { FindCommentDto } from "./dto/find-comment.dto";

@Injectable()
export class CommentRepository extends Repository<Comment> {
  constructor(dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }

  async findAll(findCommentDto: FindCommentDto) {
    const queryBuilder = this.createQueryBuilder();

    if (findCommentDto.boardId > 0) {
      queryBuilder.where('board_id=:boardId', { boardId: findCommentDto.boardId });
    }

    return queryBuilder
      .skip(findCommentDto.getOffset())
      .take(findCommentDto.limit)
      .orderBy('created_at', findCommentDto.order)
      .getManyAndCount();
  }
}
