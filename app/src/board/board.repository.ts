import { DataSource, Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { Injectable } from '@nestjs/common';
import { FindAllBoardDto } from './dto/find-all-board.dto';
import { CustomException } from '../shared/exceptions/custom.exception';
import { InternalErrorCode } from '../shared/exceptions/internal-error-code.enum';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(datasource: DataSource) {
    super(Board, datasource.createEntityManager());
  }

  async findAll(findAllBoardDto: FindAllBoardDto) {
    const queryBuilder = this.createQueryBuilder();

    if (findAllBoardDto.searchType && findAllBoardDto.search === '') {
      throw new CustomException({
        errorCode: InternalErrorCode.BOARD_INVALID_SEARCH,
        errorMessage: 'BOARD_INVALID_SEARCH',
      });
    }

    if (findAllBoardDto.searchType === 'TITLE') {
      queryBuilder.where(
        `MATCH(title) AGAINST ('${findAllBoardDto.search}*' IN BOOLEAN MODE)`,
      );
    }

    if (findAllBoardDto.searchType === 'AUTHOR') {
      queryBuilder.where(
        `MATCH(author) AGAINST ('${findAllBoardDto.search}' IN BOOLEAN MODE)`,
      );
    }

    return await queryBuilder
      .skip(findAllBoardDto.getOffset())
      .take(findAllBoardDto.limit)
      .orderBy('id', findAllBoardDto.order)
      .addOrderBy('created_at', findAllBoardDto.order)
      .getManyAndCount();
  }

  async findOneWithPasswordColumn(id: number): Promise<Board> {
    const foundBoard = await this.createQueryBuilder()
      .select(['id', 'title', 'content', 'author'])
      .addSelect('created_at', 'createdAt')
      .addSelect('updated_at', 'updatedAt')
      .addSelect('password')
      .where('id=:id', { id: id })
      .getRawOne();

    // getRawOne 으로 가져오는 결과는 json 데이터이기 때문에 Board entity 로 다시 변경해준다.
    return new Board(foundBoard);
  }
}
