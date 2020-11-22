import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';
import * as ProductService from '../../src/services/products';
import { catalogBatchProcess } from '../../src/handlers/catalogBatchProcess';
import createEvent from '@serverless/event-mocks';

jest.mock('../../src/utils/connectToDataBase', () => {
  return jest.fn().mockReturnValue(Promise.resolve({
    sequelize: {
      close: jest.fn()
    }
  }));
});

const product = {
  title: 'Title',
  description: 'Description',
  price: 1000,
  count: 50,
  imageUrl: 'http://test.com',
};
const validEvent = createEvent(
  'aws:sqs',
  {
    Records: [{
      body: JSON.stringify(product),
      messageId: '1',
      receiptHandle: '2',
      attributes: null,
      messageAttributes: null,
      md5OfBody: null,
      eventSource: null,
      eventSourceARN: null,
      awsRegion: null,
    }],
  }
);

describe('catalogBatchProcess handler', () => {
  let createProductSpy = jest.spyOn(ProductService, 'createProduct');
  let mockSQSDelete = jest.fn();
  let mockSNSPublish = jest.fn();

  beforeEach(() => {
    process.env.SQS_URL = 'test url';
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock('SQS', 'deleteMessage', (_params, callback) => {
      mockSQSDelete();
      callback(null, 'Test message deleted');
    });
    AWSMock.mock('SNS', 'publish', (_params, callback) => {
      mockSNSPublish();
      callback(null, 'Test email');
    });
  });

  afterEach(() => {
    AWSMock.restore();
  });

  describe('valid data', () => {
    beforeEach(() => {
      createProductSpy.mockImplementation(() => Promise.resolve(product));
    });

    it('should insert product in db', async () => {
      await catalogBatchProcess(validEvent, null, null);
      expect(createProductSpy).toBeCalledTimes(1);
      expect(createProductSpy.mock.calls[0][1]).toEqual(product);
    });

    it('should send success email', async () => {
      await catalogBatchProcess(validEvent, null, null);
      expect(mockSNSPublish).toBeCalledTimes(1);
    });

    it('should delete message', async () => {
      await catalogBatchProcess(validEvent, null, null);
      expect(mockSQSDelete).toBeCalledTimes(1);
    });
  });

  describe('invalid data', () => {
    beforeEach(() => {
      createProductSpy.mockImplementation(() => Promise.reject(new Error('Validation error')));
    });

    it('should insert product in db', async () => {
      await catalogBatchProcess(validEvent, null, null);
      expect(createProductSpy).toBeCalledTimes(1);
      expect(createProductSpy.mock.calls[0][1]).toEqual(product);
    });

    it('should send failed email', async () => {
      await catalogBatchProcess(validEvent, null, null);
      expect(mockSNSPublish).toBeCalledTimes(1);
    });

    it('should not delete message', async () => {
      await catalogBatchProcess(validEvent, null, null);
      expect(mockSQSDelete).not.toBeCalled();
    });
  });
});
