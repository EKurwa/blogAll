import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse();
    const status = exception.getStatus();
    const res = exception.getResponse() as { message: string[] };
    const message = res.message
      ? typeof res.message === 'string'
        ? res.message
        : res.message[0]
      : exception.message;

    response.status(status).json({
      code: status,
      message,
    });
  }
}
