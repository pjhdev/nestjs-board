import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Validate } from 'class-validator';
import { PageRequestDto } from '../../shared/dtos/page-request.dto';
import { IsSearchType } from '../../shared/validation-constraints/is-search-type.constraint';

export class FindAllBoardDto extends PageRequestDto {
  @ApiPropertyOptional({
    description: 'Available values : TITLE | AUTHOR',
  })
  @Validate(IsSearchType)
  searchType: 'TITLE' | 'AUTHOR' = null;

  @ApiPropertyOptional()
  @IsString()
  search: string = '';
}
