export const HEADERS: { [header: string]: boolean | number | string; } = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

export const BUCKET_NAME = 'node-js-aws-csv';
export const BUCKET_REGION = 'eu-west-1';
export const BUCKET_PREFIX = 'uploaded/';
