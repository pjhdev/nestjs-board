import { applyDecorators, HttpCode, HttpStatus, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { Response } from '../dtos/response.dto';
import { ResponseEntity } from '../dtos/response-entity.dto';

export interface ApiResponseEntityMetaOptions {
  type?: Type<any>;
  summary?: string;
  isArray?: boolean;
  isPagination?: boolean;
}

export declare type ApiResponseEntityOptions = ApiResponseEntityMetaOptions;

export const ApiResponseDto = (options?: ApiResponseEntityOptions) => {
  if (!options || !options?.type) {
    return applyDecorators(
      HttpCode(HttpStatus.OK),
      ApiOperation({ summary: options?.summary }),
      ApiExtraModels(Response),
      ApiResponse({ status: 403, description: 'Forbidden.' }),
      ApiOkResponse({ type: Response }),
    );
  }

  let properties: Record<string, any>;
  if (options?.isArray) {
    properties = {
      data: { type: 'array', items: { $ref: getSchemaPath(options.type) } },
    };
  } else if (options?.isPagination) {
    properties = {
      data: { type: 'array', items: { $ref: getSchemaPath(options.type) } },
      //meta: { $ref: getSchemaPath(PageMetaDto) },
    };
  } else {
    properties = { data: { $ref: getSchemaPath(options.type) } };
  }
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiExtraModels(ResponseEntity),
    ApiExtraModels(options.type),
    //ApiExtraModels(PageMetaDto),
    ApiOperation({ summary: options?.summary }),
    ApiResponse({ status: 403, description: 'Forbidden.' }),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseEntity) },
          {
            properties: properties,
          },
        ],
      },
    }),
  );
};
