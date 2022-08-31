import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponseDto } from '../shared/decorators/api-response.decorator';
import { CommentDto } from './dto/comment.dto';
import { ResponseEntity } from '../shared/dtos/response-entity.dto';
import { FindCommentDto } from "./dto/find-comment.dto";

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiResponseDto({ type: CommentDto, summary: '댓글 작성 API' })
  async create(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<ResponseEntity<CommentDto>> {
    const commentDto = await this.commentService.create(createCommentDto);

    return new ResponseEntity<CommentDto>().body(commentDto);
  }

  @Get()
  @ApiResponseDto({
    type: CommentDto,
    summary: '댓글 목록 API',
    isArray: true,
    isPagination: true
  })
  async findAll(
    @Query() findCommentDto: FindCommentDto,
  ): Promise<ResponseEntity<CommentDto[]>> {
    const [comments, totalCount] = await this.commentService.findAll(
      findCommentDto,
    );

    return new ResponseEntity<CommentDto[]>().body(comments).setPageMeta({
      ...findCommentDto,
      totalCount,
    });
  }
}
