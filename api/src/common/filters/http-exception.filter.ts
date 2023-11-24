import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface ExceptionResponse {
  message: string[];
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    let message = exception.message;
    if (typeof exception.getResponse() === 'string') {
      message = exception.getResponse() as string;
    } else {
      const r = <ExceptionResponse>exception.getResponse();
      if (r.message instanceof Array) {
        message = r.message.join(', ');
      }
    }
    response.status(status).json({
      status,
      timestamp: new Date().toISOString(),
      message,
      path: request.url,
    });
  }
}
