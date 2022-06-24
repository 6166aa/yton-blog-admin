import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';

@Catch()
export class CommonExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    //拦截typeorm的重复插入错误
    if (exception instanceof QueryFailedError) {
      if (((exception as any).code = 'ER_DUP_ENTRY')) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const res = exception.message.match(/'(?<value>.+)' (?=for)/);
        if (res) {
          const { value } = res.groups;
          const body = request.body;
          let key: string = null;
          Object.keys(body).some((k) => body[k] === value && (key = k));
          return response.status(400).json({
            statusCode: 400,
            message: `${key}(${value}) is existed!`,
            error: 'Bad Request',
          });
        }
      }
    }
    super.catch(exception, host);
  }
}
