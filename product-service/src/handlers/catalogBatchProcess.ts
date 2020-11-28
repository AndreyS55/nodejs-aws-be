import AWS from 'aws-sdk';
import { SQSEvent, SQSHandler, SQSRecord } from 'aws-lambda';
import connectToDataBase from '../utils/connectToDataBase';
import * as ProductService from '../services/products';
import { DataBase } from '../interfaces/dataBase';
import util  from 'util';
import { Product } from '../interfaces/product';

const processMessage = async (record: SQSRecord) => {
  let db: DataBase;
  const sqs = new AWS.SQS();
  const formattedBody = JSON.parse(record.body);
  try {
    db = await connectToDataBase();
    const product = await ProductService.createProduct(db, formattedBody);
    console.log('Product successfully created: ', product);

    await sqs.deleteMessage({
      QueueUrl: process.env.SQS_URL,
      ReceiptHandle: record.receiptHandle
    }).promise();
    console.log('Message deleted from queue: ', record);

    return product;
  } catch (e) {
    console.error(e.message, e.stack);
    throw e;
  } finally {
    await db.sequelize.close();
  }
};

export const catalogBatchProcess: SQSHandler = async (event: SQSEvent) => {
  console.log('Start invoking catalogBatchProcess function', util.inspect(event, { depth: 5 }));

  const sns = new AWS.SNS();
  const messagePromises = event.Records.map(processMessage);
  const processedMessages = await Promise.allSettled(messagePromises);

  const succeededMessages = processedMessages
    .filter((promise) => promise.status === 'fulfilled')
    .map((promise: PromiseFulfilledResult<Product>) => promise.value);
  const failedMessages = processedMessages
    .filter((promise) => promise.status === 'rejected')
    .map((promise: PromiseRejectedResult) => promise.reason);

  if (succeededMessages.length) {
    await sns.publish({
      Subject: 'Product successfully saved',
      Message: JSON.stringify(succeededMessages, null, 2),
      MessageAttributes: { status: { DataType: 'String', StringValue: 'fulfilled' } },
      TopicArn: process.env.SNS_ARN,
    }).promise();
    console.log('Send email for: ', succeededMessages);
  }

  if (failedMessages.length) {
    await sns.publish({
      Subject: 'Product not saved',
      Message: JSON.stringify(failedMessages, null, 2),
      MessageAttributes: { status: { DataType: 'String', StringValue: 'rejected' } },
      TopicArn: process.env.SNS_ARN,
    }).promise();
    console.log('Send email for: ', failedMessages);

    console.error('Partial batch failure');
  }
  return null;
}
