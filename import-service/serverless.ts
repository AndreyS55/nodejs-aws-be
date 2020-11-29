import type { Serverless } from 'serverless/aws';
import { BUCKET_NAME, BUCKET_PREFIX } from './src/constants';
import { apiGatewayResponse } from './src/utils/apiGatewayResponse';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'import-service',
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    authorizerArn: { 'Fn::ImportValue': 'BasicAuthorizerArn' },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    stage: 'dev',
    region: 'eu-west-1',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 's3:ListBucket',
        Resource: 'arn:aws:s3:::node-js-aws-csv',
      },
      {
        Effect: 'Allow',
        Action: 's3:*',
        Resource: 'arn:aws:s3:::node-js-aws-csv/*',
      },
      {
        Effect: 'Allow',
        Action: 'sqs:*',
        Resource: '${cf:product-service-${self:provider.stage}.SQSQueueArn}',
      },
    ],
    apiGateway: {
      minimumCompressionSize: 1024,
      // @ts-ignore-next-line
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      SQS_URL: '${cf:product-service-${self:provider.stage}.SQSQueueUrl}',
    },
  },
  functions: {
    importProductsFile: {
      handler: 'handler.importProductsFile',
      events: [
        {
          http: {
            method: 'get',
            path: 'import',
            cors: true,
            request: {
              parameters: {
                querystrings: {
                  name: true,
                },
              },
            },
            authorizer: {
              name: 'authorizer',
              arn: '${self:custom.authorizerArn}',
              type: 'REQUEST',
            },
          },
        },
      ],
    },
    importFileParser: {
      handler: 'handler.importFileParser',
      events: [
        {
          s3: {
            bucket: BUCKET_NAME,
            event: 's3:ObjectCreated:*',
            rules: [
              {
                prefix: BUCKET_PREFIX,
                suffix: '',
              },
            ],
            existing: true,
          },
        },
      ],
    },
  },
  resources: {
    Resources: {
      GatewayResponseAccessDenied: apiGatewayResponse('ACCESS_DENIED'),
      GatewayResponseUnauthorized: apiGatewayResponse('UNAUTHORIZED'),
      GatewayResponseMissingAuthenticationToken: apiGatewayResponse('MISSING_AUTHENTICATION_TOKEN'),
      GatewayResponseExpiredToken: apiGatewayResponse('EXPIRED_TOKEN'),
      GatewayResponseAuthorizerFailure: apiGatewayResponse('AUTHORIZER_FAILURE', '{"message": "Error occurred during authorization"}'),
      GatewayResponseAuthorizerConfigurationError: apiGatewayResponse('AUTHORIZER_CONFIGURATION_ERROR'),
    },
  },
};

module.exports = serverlessConfiguration;
