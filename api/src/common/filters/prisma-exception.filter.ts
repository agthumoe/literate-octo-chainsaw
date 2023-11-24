import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const message = exception.message.replace(/\n/g, '');

    switch (exception.code) {
      case 'P2002':
        response.status(HttpStatus.CONFLICT).json({
          status: HttpStatus.CONFLICT,
          timestamp: new Date().toISOString(),
          message,
          path: request.url,
        });
        break;
      case 'P2025':
        response.status(HttpStatus.NOT_FOUND).json({
          status: HttpStatus.NOT_FOUND,
          timestamp: new Date().toISOString(),
          message,
          path: request.url,
        });
        break;
      default:
        response.status(HttpStatus.BAD_REQUEST).json({
          status: HttpStatus.BAD_REQUEST,
          timestamp: new Date().toISOString(),
          message,
          path: request.url,
        });
        break;
    }
  }
}
