import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class HttpHeadersInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();

    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Credentials', 'true');

    return next.handle();
  }
}
