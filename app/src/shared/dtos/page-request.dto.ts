import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_ORDER,
  DEFAULT_PAGE_SIZE,
} from '../constants/page.constant';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {IsNumber, IsString, Validate} from 'class-validator';
import {IsValidPageRequest} from "../validation-constraints/is-valid-page-request.constraint";

export class PageRequestDto {
  @ApiPropertyOptional()
  @IsNumber()
  @Validate(IsValidPageRequest)
  page: number = DEFAULT_PAGE_INDEX;

  @ApiPropertyOptional()
  @IsNumber()
  @Validate(IsValidPageRequest)
  limit: number = DEFAULT_PAGE_SIZE;

  @ApiPropertyOptional({
    description: 'Available values : ASC | DESC',
  })
  @IsString()
  @Validate(IsValidPageRequest)
  order: 'ASC' | 'DESC' = DEFAULT_PAGE_ORDER;

  getOffset() {
    return (this.page - 1) * this.limit;
  }
}
