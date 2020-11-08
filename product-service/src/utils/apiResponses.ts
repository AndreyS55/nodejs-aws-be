import { HEADERS } from '../constants/headers';
import { APIGatewayProxyResult } from 'aws-lambda';

const apiResponse = (
  statusCode: number,
  body: { [key: string]: any },
  headers?: { [header: string]: boolean | number | string; }
): APIGatewayProxyResult => {
  return {
    statusCode,
    headers: { ...HEADERS, ...headers },
    body: JSON.stringify(body, null, 2),
  };
};

export default apiResponse;
