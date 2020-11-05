import { getAllProducts } from '../../src/handlers/getAllProducts';
import { APIGatewayProxyEvent } from 'aws-lambda';

describe('getAllProducts handler', () => {
  it('should return a StatusCode of 200', async () => {
    const event = {};
    const result = await getAllProducts(event as APIGatewayProxyEvent, null, null);
    expect(result && result.statusCode).toEqual(200);
  });
});

