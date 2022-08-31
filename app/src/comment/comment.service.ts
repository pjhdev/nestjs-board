import { Injectable } from '@nestjs/common';
import { Comment } from './entities/comment.entity';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentDto } from './dto/comment.dto';
import { BoardRepository } from '../board/board.repository';
import { CustomException } from '../shared/exceptions/custom.exception';
import { InternalErrorCode } from '../shared/exceptions/internal-error-code.enum';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FindCommentDto } from "./dto/find-comment.dto";

@Injectable()
export class CommentService {
  constructor(
    private boardRepository: BoardRepository,
    private commentRepository: CommentRepository,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<CommentDto> {
    const board = await this.boardRepository.findOneBy({
      id: createCommentDto.boardId,
    });

    if (!board) {
      throw new CustomException({
        errorCode: InternalErrorCode.BOARD_NOT_FOUND,
        errorMessage: 'BOARD_NOT_FOUND',
      });
    }

    let comment: Comment;
    let parentCommentId: number = 0;
    if (createCommentDto.commentId > 0) {
      comment = await this.commentRepository.findOneBy({
        id: createCommentDto.commentId,
      });

      if (
        createCommentDto.boardId > 0 &&
        Number((await comment.board)?.id) !== createCommentDto.boardId
      ) {
        throw new CustomException({
          errorCode:
            InternalErrorCode.COMMENT_PARENT_COMMENT_BOARD_ID_NOT_MATCHED,
          errorMessage: 'COMMENT_PARENT_COMMENT_BOARD_ID_NOT_MATCHED',
        });
      }

      if (!comment) {
        throw new CustomException({
          errorCode: InternalErrorCode.COMMENT_NOT_FOUND,
          errorMessage: 'COMMENT_NOT_FOUND',
        });
      }

      if (comment?.parent > 0) {
        throw new CustomException({
          errorCode: InternalErrorCode.COMMENT_INVALID_DEPTH,
          errorMessage: 'COMMENT_INVALID_DEPTH',
        });
      }

      parentCommentId = comment.id;
    }

    const createdComment = await this.commentRepository.save(
      new Comment({
        content: createCommentDto.content,
        author: createCommentDto.author,
        parent: parentCommentId,
        board: Promise.resolve(board),
      }),
    );

    this.eventEmitter.emit('comment.created', {
      id: createdComment.id,
      content: createdComment.content,
    });

    return CommentDto.fromEntity(createdComment);
  }

  async findAll(
    findCommentDto: FindCommentDto,
  ): Promise<[CommentDto[], number]> {
    const [comments, totalCount] = await this.commentRepository.findAll(
      findCommentDto,
    );

    return [CommentDto.fromEntities(comments), totalCount];
  }
}
