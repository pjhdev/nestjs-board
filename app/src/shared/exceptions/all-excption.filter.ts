import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ExceptionDto } from '../dtos/exception.dto';
import { CustomException } from './custom.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : exception instanceof CustomException
        ? exception.getErrorCode()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody: ExceptionDto = new ExceptionDto({
      errorCode: httpStatus,
      errorMessage:
        exception instanceof CustomException
          ? exception?.getErrorMessage()
          : exception?.response?.message
          ? exception?.response?.message.toString()
          : exception?.message,
    });

    httpAdapter.reply(ctx.getResponse(), responseBody, HttpStatus.OK);
  }
}
