import AWS from 'aws-sdk';
import csvParser from 'csv-parser';
import { S3Event } from 'aws-lambda';
import { BUCKET_NAME, BUCKET_REGION } from '../constants';
import util from 'util';

export const importFileParser = async (event: S3Event): Promise<{statusCode: number} | undefined> => {
  console.log('importFileParser function was triggered', util.inspect(event, { depth: 5 }));
  try {
    const s3 = new AWS.S3({ region: BUCKET_REGION });
    const sqs = new AWS.SQS();

    for (const record of event.Records) {
      const s3ReadStream = s3.getObject({
        Bucket: BUCKET_NAME,
        Key: record.s3.object.key,
      }).createReadStream();

      await new Promise(((resolve, reject) => {
        s3ReadStream
          .pipe(csvParser())
          .on('data', (data) => {
            console.log('Parsed data', data);
            sqs.sendMessage({
              QueueUrl: process.env.SQS_URL,
              MessageBody: JSON.stringify(data, null, 2),
            }, (err, data) => {
              if (err) {
                console.error('Sending message failed: ', err);
              } else {
                console.log('Send message for: ', data);
              }
            });
          })
          .on('error', (error) => reject(error))
          .on('end', async () => {
            console.log(`Start copying file from ${BUCKET_NAME}/${record.s3.object.key} into ${BUCKET_NAME}/parsed/`);

            await s3.copyObject({
              Bucket: BUCKET_NAME,
              CopySource: `${BUCKET_NAME}/${record.s3.object.key}`,
              Key: record.s3.object.key.replace('uploaded', 'parsed'),
            }).promise();
            console.log(`File copied into ${BUCKET_NAME}/${record.s3.object.key.replace('uploaded', 'parsed')}`);

            await s3.deleteObject({
              Bucket: BUCKET_NAME,
              Key: record.s3.object.key,
            }).promise();
            console.log(`File ${BUCKET_NAME}/${record.s3.object.key} removed`);
            resolve('success');
          });
      }));
    }
    return {
      statusCode: 202,
    }
  } catch (e) {
    console.error(e);
    return;
  }
}
