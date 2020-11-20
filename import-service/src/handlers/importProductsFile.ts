import { APIGatewayProxyHandler } from 'aws-lambda';
import AWS from 'aws-sdk';
import { BUCKET_NAME, BUCKET_PREFIX, BUCKET_REGION } from '../constants';
import createResponse from '../utils/createResponse';
import util from 'util';

export const importProductsFile: APIGatewayProxyHandler = async (event, _context) => {
  console.log('Start invoking importProductsFile function', util.inspect(event, { depth: 5 }));
  try {
    const name = event.queryStringParameters?.name;
    if (!name) {
      return createResponse(400, { message: 'Please provide valid filename' });
    }
    const s3 = new AWS.S3({ region: BUCKET_REGION });
    const catalogPath = `${BUCKET_PREFIX}${name}`;
    console.log('Path to import new file: ', catalogPath);
    const params = {
      Bucket: BUCKET_NAME,
      Key: catalogPath,
      Expires: 60,
      ContentType: 'text/csv',
    };
    const signedUrl = await s3.getSignedUrlPromise('putObject', params);
    return createResponse(200, signedUrl);
  } catch (e) {
    console.error(e);
    return createResponse(500, { message: e.message });
  }
}
