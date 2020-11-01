import { APIGatewayProxyHandler } from 'aws-lambda';
import { productList } from '../constants/productList';
import apiResponses from '../utils/apiResponses';

export const getProductById: APIGatewayProxyHandler = async (event) => {
  console.log('Started invoking getProductById function');
  try {
    const id = event.pathParameters?.id;
    const product = productList.find(product => product.id === id);
    if (!product) {
      return apiResponses['404']({ id, message: 'Product not found' });
    }
    return apiResponses['200'](product, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    });
  } catch (e) {
    console.error('Function invocation failed', e);
    return apiResponses['500']({ message: e.message });
  }
}
