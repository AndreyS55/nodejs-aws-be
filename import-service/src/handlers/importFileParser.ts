import AWS from 'aws-sdk';
import csvParser from 'csv-parser';
import { S3Event } from 'aws-lambda';
import { BUCKET_NAME, BUCKET_REGION } from '../constants';
import util from 'util';

export const importFileParser = async (event: S3Event): Promise<{statusCode: number} | undefined> => {
  console.log('importProductsFile function was triggered', util.inspect(event, { depth: 5 }));
  try {
    const s3 = new AWS.S3({ region: BUCKET_REGION });

    for (const record of event.Records) {
      const s3ReadStream = s3.getObject({
        Bucket: BUCKET_NAME,
        Key: record.s3.object.key,
      }).createReadStream();

      await new Promise(((resolve, reject) => {
        s3ReadStream
          .pipe(csvParser())
          .on('data', (data) => console.log('Parsed data', data))
          .on('error', (error) => reject(error))
          .on('end', async () => {
            console.log(`Start copying file from 'uploaded/' into 'parsed/'`);

            await s3.copyObject({
              Bucket: BUCKET_NAME,
              CopySource: `${BUCKET_NAME}/${record.s3.object.key}`,
              Key: record.s3.object.key.replace('uploaded', 'parsed'),
            }).promise();

            await s3.deleteObject({
              Bucket: BUCKET_NAME,
              Key: record.s3.object.key,
            }).promise();

            console.log(`File ${record.s3.object.key} moved to 'parsed' folder`);
            resolve();
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
