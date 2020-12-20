import { Request } from 'express';

export const isGetProducts = (request: Request) => {
  return request.method === 'GET' && request.url === '/products';
}
