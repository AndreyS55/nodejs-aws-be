import type { Serverless } from 'serverless/aws';
import config from './src/config';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'product-service',
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
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
        Action: 'sqs:*',
        Resource: { 'Fn::GetAtt': [ 'SQSQueue', 'Arn' ] },
      },
      {
        Effect: 'Allow',
        Action: 'sns:*',
        Resource: { Ref: 'SNSTopic' },
      },
    ],
    apiGateway: {
      minimumCompressionSize: 1024,
      // @ts-ignore-next-line
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      DB_URL: config.db.url,
      DB_PORT: config.db.port,
      DB_NAME: config.db.name,
      DB_USERNAME: config.db.username,
      DB_PASSWORD: config.db.password,
      SQS_URL: { Ref: 'SQSQueue' },
      SNS_ARN: { Ref: 'SNSTopic' },
    },
  },
  functions: {
    getAllProducts: {
      handler: 'handler.getAllProducts',
      events: [
        {
          http: {
            method: 'get',
            path: 'products',
            cors: true,
          }
        }
      ]
    },
    getProductById: {
      handler: 'handler.getProductById',
      events: [
        {
          http: {
            method: 'get',
            path: 'products/{id}',
            cors: true,
          }
        }
      ]
    },
    createProduct: {
      handler: 'handler.createProduct',
      events: [
        {
          http: {
            method: 'post',
            path: 'products',
            cors: true,
          }
        }
      ]
    },
    catalogBatchProcess: {
      handler: 'handler.catalogBatchProcess',
      events: [
        {
          sqs: {
            batchSize: 5,
            arn: { 'Fn::GetAtt': [ 'SQSQueue', 'Arn' ] },
          }
        }
      ]
    }
  },
  resources: {
    Resources: {
      SQSQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'catalogItemsQueue'
        }
      },
      SNSTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'createProductTopic'
        }
      },
      SNSSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'storandaws@gmail.com',
          FilterPolicy: {
            status: ['fulfilled'],
          },
          Protocol: 'email',
          TopicArn: {
            Ref: 'SNSTopic',
          }
        }
      },
      SNSSubscriptionRejected: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'storanddev@gmail.com',
          FilterPolicy: {
            status: ['rejected'],
          },
          Protocol: 'email',
          TopicArn: {
            Ref: 'SNSTopic',
          }
        }
      },
    },
    Outputs: {
      SQSQueueUrl: {
        Value: { Ref: 'SQSQueue' },
      },
      SQSQueueArn: {
        Value: { 'Fn::GetAtt': [ 'SQSQueue', 'Arn' ] },
      },
    },
  },
}

module.exports = serverlessConfiguration;
