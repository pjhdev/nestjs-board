import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ApiTags } from '@nestjs/swagger';
import { FindAllBoardDto } from './dto/find-all-board.dto';
import { BoardDto } from './dto/board.dto';
import { Response } from '../shared/dtos/response.dto';
import { ResponseEntity } from '../shared/dtos/response-entity.dto';
import { ApiResponseDto } from '../shared/decorators/api-response.decorator';
import { RemoveBoardDto } from './dto/remove-board.dto';

@ApiTags('board')
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @ApiResponseDto({ type: BoardDto, summary: '게시글 작성 API' })
  async create(
    @Body() createBoardDto: CreateBoardDto,
  ): Promise<ResponseEntity<BoardDto>> {
    const boardDto = await this.boardService.create(createBoardDto);

    return new ResponseEntity<BoardDto>().body(boardDto);
  }

  @Get()
  @ApiResponseDto({
    type: BoardDto,
    summary: '게시글 목록 API (Paging & Search)',
    isArray: true,
    isPagination: true
  })
  async findAll(
    @Query()
    findAllBoardDto: FindAllBoardDto,
  ): Promise<ResponseEntity<BoardDto[]>> {
    const [boards, totalCount] = await this.boardService.findAll(
      findAllBoardDto,
    );

    return new ResponseEntity<BoardDto[]>().body(boards).setPageMeta({
      ...findAllBoardDto,
      totalCount,
    });
  }

  @Patch()
  @ApiResponseDto({ type: BoardDto, summary: '게시글 수정 API' })
  async update(
    @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<ResponseEntity<BoardDto>> {
    const updatedBoard = await this.boardService.update(updateBoardDto);

    return new ResponseEntity<BoardDto>().body(updatedBoard);
  }

  @Delete()
  @ApiResponseDto({ summary: '게시글 삭제 API' })
  async remove(@Body() removeBoardDto: RemoveBoardDto): Promise<Response> {
    await this.boardService.remove(removeBoardDto);

    return new Response();
  }
}
