import { inspect } from 'util';
import { APIGatewayAuthorizerHandler } from 'aws-lambda/trigger/api-gateway-authorizer';
import { generatePolicy } from '../utils/generatePolicy';

export const basicAuthorizer: APIGatewayAuthorizerHandler = (event, _context, callback) => {
  console.log('Start invoking basicAuthorizer function', inspect(event, { depth: 5 }));
  try {
    if (event.type !== 'REQUEST') {
      callback('Unauthorized');
      return; // need this explicit return to avoid typescript errors
    }

    const authHeader = event.headers.Authorization;
    if (!authHeader || authHeader.split(' ')[0] !== 'Basic') {
      callback('Unauthorized');
      return;
    }

    const encodedCreds = authHeader.split(' ')[1];
    if (!encodedCreds) {
      callback('Unauthorized');
      return;
    }
    const buffer = Buffer.from(encodedCreds, 'base64');
    const plainCreds = buffer.toString('utf-8').split(':');
    const [name, password] = plainCreds;

    console.log(`Username: ${name}, password: ${password}`);

    const storedPassword = process.env[name];
    const effect = !storedPassword || storedPassword !== password ? 'Deny' : 'Allow';
    const policy = generatePolicy(encodedCreds, event.methodArn, effect);
    callback(null, policy);
  } catch (e) {
    console.error(e);
    callback('Authorizer failure');
  }
};
