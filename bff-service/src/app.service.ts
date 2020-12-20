import { Injectable } from '@nestjs/common';
import axios, { AxiosPromise, AxiosRequestConfig, Method } from 'axios';
import { Request } from 'express';

@Injectable()
export class AppService {
  processRequest(request: Request, recipientURL: string): AxiosPromise {
    const axiosConfig: AxiosRequestConfig = {
      method: request.method as Method,
      url: `${recipientURL}${request.originalUrl}`,
      ...Object.keys(request.body || {}).length && { data: request.body },
    };
    console.log('axios config: ', axiosConfig);

    return axios(axiosConfig);
  }
}
