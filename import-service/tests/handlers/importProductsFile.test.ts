import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';
import { importProductsFile } from '../../src/handlers/importProductsFile';
import createEvent from '@serverless/event-mocks';

describe('Import products file handler', () => {
  beforeEach(() => {
    AWSMock.setSDKInstance(AWS);
  });

  afterEach(() => {
    AWSMock.restore();
  });

  it ('should return status code 400 if filename not provided in queries', async () => {
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
        pathParameters: null,
      }
    );

    const result = await importProductsFile(mockEvent, null, null);
    expect(result && result.statusCode).toEqual(400);
  });

  it('should return correct signed URL', async () => {
    AWSMock.mock('S3', 'getSignedUrl', (_action, _params, callback) => {
      callback(null, 'testSignedUrl')
    });

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
        queryStringParameters: { name: 'testQuery' },
        requestContext: null,
        resource: '',
        stageVariables: null,
        pathParameters: null,
      }
    );

    const result = await importProductsFile(mockEvent, null, null);
    expect(result && result.statusCode).toEqual(200);
    expect(result && result.body).toEqual('testSignedUrl');
  });

  it ('should return status code 500 if getSignedUrlPromise failed', async () => {
    AWSMock.mock('S3', 'getSignedUrl', (_action, _params, callback) => {
      callback(null, Promise.reject('error'))
    });

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
        queryStringParameters: { name: 'testQuery' },
        requestContext: null,
        resource: '',
        stageVariables: null,
        pathParameters: null,
      }
    );

    const result = await importProductsFile(mockEvent, null, null);
    expect(result && result.statusCode).toEqual(500);
  });
});
