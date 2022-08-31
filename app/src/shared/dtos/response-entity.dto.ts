import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class ResponseEntity<T> {
  @ApiProperty({ example: true })
  private isSuccess: boolean = true;
  /*@ApiProperty({ example: HttpStatus.OK })
  private status: HttpStatus = HttpStatus.OK;*/
  @ApiProperty()
  private data: T | T[];
  @ApiProperty({
    example: {
      hasPreviousPage: false,
      hasNextPage: true,
      currentPage: 1,
      totalPageCount: 10,
      totalCount: 99,
      limit: 10,
    },
  })
  private pageMeta?: {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    currentPage: number;
    totalPageCount: number;
    totalCount: number;
    limit: number;
  };

  body(data: T | T[]): this {
    this.data = data;

    return this;
  }

  setPageMeta(pageOptions: any) {
    const totalPageCount = Math.ceil(
      pageOptions.totalCount / pageOptions.limit,
    );
    this.pageMeta = {
      totalPageCount: totalPageCount,
      hasPreviousPage: +pageOptions.page > 1,
      hasNextPage: pageOptions.page < totalPageCount,
      currentPage: +pageOptions.page,
      totalCount: pageOptions.totalCount,
      limit: pageOptions.limit,
    };

    return this;
  }
}
