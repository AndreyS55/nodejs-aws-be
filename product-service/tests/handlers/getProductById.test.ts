import { getProductById } from '../../src/handlers/getProductById';
import createEvent from '@serverless/event-mocks';

describe('getProductById handler', () => {
  it('should return a StatusCode of 200 if request with existing id', async () => {
    const mockEvent = createEvent(
      'aws:apiGateway',
      {
        body: null,
        headers: {},
        httpMethod: '',
        isBase64Encoded: false,
        multiValueHeaders: {},
        multiValueQueryStringParameters: null,
        path: '',
        queryStringParameters: null,
        requestContext: null,
        resource: '',
        stageVariables: null,
        pathParameters: {
          id: '51e8d8bc-df5c-4dc7-a4e9-9d704dcf3934'
        }
      }
    );

    const result = await getProductById(mockEvent, null, null);
    expect(result && result.statusCode).toEqual(200);
  });

  it('should return a StatusCode of 404 if request with wrong id', async () => {
    const mockEvent = createEvent(
      'aws:apiGateway',
      {
        body: null,
        headers: {},
        httpMethod: '',
        isBase64Encoded: false,
        multiValueHeaders: {},
        multiValueQueryStringParameters: null,
        path: '',
        queryStringParameters: null,
        requestContext: null,
        resource: '',
        stageVariables: null,
        pathParameters: {
          id: '51e8d8bc-df5c-4dc7-a4e9-9d704dcf3955'
        }
      }
    );
    const result = await getProductById(mockEvent, null, null);
    expect(result && result.statusCode).toEqual(404);
  });

  it('should return a StatusCode of 500 if request with not uuid', async () => {
    const mockEvent = createEvent(
      'aws:apiGateway',
      {
        body: null,
        headers: {},
        httpMethod: '',
        isBase64Encoded: false,
        multiValueHeaders: {},
        multiValueQueryStringParameters: null,
        path: '',
        queryStringParameters: null,
        requestContext: null,
        resource: '',
        stageVariables: null,
        pathParameters: {
          id: '1234'
        }
      }
    );
    const result = await getProductById(mockEvent, null, null);
    expect(result && result.statusCode).toEqual(500);
  });
});
