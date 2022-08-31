import { Controller, Get } from '@nestjs/common';
import { Response } from './shared/dtos/response.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller()
export class AppController {
  constructor() {}

  @Get('health')
  health(): Response {
    return new Response();
  }
}
