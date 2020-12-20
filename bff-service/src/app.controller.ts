import { All, CACHE_MANAGER, Controller, Inject, Req, Res, UseInterceptors } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { ProductModel } from './product.model';
import { isGetProducts } from './utils';
import { HttpHeadersInterceptor } from './http-headers.interceptor';

@Controller()
@UseInterceptors(HttpHeadersInterceptor)
export class AppController {
  constructor(private readonly appService: AppService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @All()
  async processAllRequests(@Req() request: Request, @Res() response: Response) {
    console.log('original URL: ', request.url);
    console.log('method: ', request.method);
    console.log('body: ', request.body);

    if (isGetProducts(request)) {
      const cache = await this.cacheManager.get('products');
      if (cache) {
        return response.json(cache);
      }
    }

    const recipient = request.url.split('/')[1];
    console.log('recipient: ', recipient);

    const recipientURL = process.env[recipient];
    console.log('recipient URL: ', recipientURL);

    if (recipientURL) {
      this.appService.processRequest(request, recipientURL)
        .then((res) => {
          console.log('response from recipient: ', res);

          if (isGetProducts(request)) {
            this.cacheManager.set<ProductModel>('products', res.data, { ttl: 120 });
          }

          return response.json(res.data);
        })
        .catch((err) => {
          console.error('Error on recipient: ', err);
          if (err.response) {
            const { status, data } = err.response;
            return response.status(status).json(data);
          } else {
            return response.status(500).json({ message: err.message });
          }
        })
    } else {
      return response.status(502).json({ message: 'Cannot process request' });
    }
  }
}
