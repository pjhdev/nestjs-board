import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardRepository } from './board.repository';
import { Board } from './entities/board.entity';
import { KeywordRepository } from '../keyword/keyword.repository';
import { FindAllBoardDto } from './dto/find-all-board.dto';
import { BoardDto } from './dto/board.dto';
import { InternalErrorCode } from '../shared/exceptions/internal-error-code.enum';
import { CustomException } from '../shared/exceptions/custom.exception';
import { RemoveBoardDto } from './dto/remove-board.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class BoardService {
  constructor(
    private boardRepository: BoardRepository,
    private keywordRepository: KeywordRepository,
    private eventEmitter: EventEmitter2,
  ) {}
  async create(createBoardDto: CreateBoardDto): Promise<BoardDto | BoardDto[]> {
    const createdBoard = await this.boardRepository.save(
      new Board(createBoardDto),
    );

    this.eventEmitter.emit('board.created', {
      id: createdBoard.id,
      content: createdBoard.content,
    });

    return BoardDto.fromEntity(createdBoard);
  }

  async findAll(
    findAllBoardDto: FindAllBoardDto,
  ): Promise<[BoardDto[], number]> {
    const [boards, totalCount] = await this.boardRepository.findAll(
      findAllBoardDto,
    );

    return [BoardDto.fromEntities(boards), totalCount];
  }

  async update(updateBoardDto: UpdateBoardDto): Promise<BoardDto> {
    const board = await this.boardRepository.findOneWithPasswordColumn(
      updateBoardDto.id,
    );

    if (!board) {
      throw new CustomException({
        errorCode: InternalErrorCode.BOARD_NOT_FOUND,
        errorMessage: 'BOARD_NOT_FOUND',
      });
    }

    await board.validatePassword(updateBoardDto.password);

    if (board.content != updateBoardDto.content) {
      board.content = updateBoardDto.content;
      await this.boardRepository.save(board, { reload: false });
    }

    return BoardDto.fromEntity(board);
  }

  async remove(removeBoardDto: RemoveBoardDto): Promise<void> {
    const board = await this.boardRepository.findOneWithPasswordColumn(
      removeBoardDto.id,
    );

    if (!board) {
      throw new CustomException({
        errorCode: InternalErrorCode.BOARD_NOT_FOUND,
        errorMessage: 'BOARD_NOT_FOUND',
      });
    }

    await board.validatePassword(removeBoardDto.password);

    await this.boardRepository.remove(board);
  }
}
