import { Injectable, NestInterceptor, ExecutionContext, CallHandler, ClassSerializerInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { CommonResponse } from '../types/commonResponse';

@Injectable()
export class CommonResponseInterceptor<T> extends ClassSerializerInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<CommonResponse<T>> {
    const res = super.intercept(context, next);
    return res.pipe(
      map((data) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        data: data,
        message: 'ok',
      })),
    );
  }
}
