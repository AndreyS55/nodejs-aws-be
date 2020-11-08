import { APIGatewayProxyHandler } from 'aws-lambda';
import { productList } from '../constants/productList';
import apiResponses from '../utils/apiResponses';

export const getAllProducts: APIGatewayProxyHandler = async () => {
  console.log('Start invoking getProductsList function');
  try {
    return apiResponses['200'](productList, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    });
  } catch (e) {
    console.error('Function invocation failed', e);
    return apiResponses['500']({ message: e.message });
  }
}
