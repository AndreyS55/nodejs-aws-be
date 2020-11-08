import { APIGatewayProxyHandler } from 'aws-lambda';
import * as ProductService from '../services/products';
import apiResponse from '../utils/apiResponses';
import connectToDataBase from '../utils/connectToDataBase';

export const getProductById: APIGatewayProxyHandler = async (event) => {
  console.log('Started invoking getProductById function', event);
  const db = await connectToDataBase();
  try {
    const id = event.pathParameters?.id;
    const product = await ProductService.getProductById(db, id);
    if (!product) {
      return apiResponse(404, { id, message: 'Product not found' });
    }
    return apiResponse(200, product);
  } catch (e) {
    console.error('Function invocation failed', e);
    return apiResponse(500, { message: e.message });
  } finally {
    await db.sequelize.close();
  }
}
