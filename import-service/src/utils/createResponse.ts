import { HEADERS } from '../constants';
import { APIGatewayProxyResult } from 'aws-lambda';

const createResponse = (
  statusCode: number,
  body: { [key: string]: any } | string,
  headers?: { [header: string]: boolean | number | string; }
): APIGatewayProxyResult => {
  return {
    statusCode,
    headers: { ...HEADERS, ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body, null, 2),
  };
};

export default createResponse;
