import { APIGatewayProxyHandler } from 'aws-lambda';
import apiResponse from '../utils/apiResponses';
import connectToDataBase from '../utils/connectToDataBase';
import * as ProductService from '../services/products';
import { DataBase } from '../interfaces/dataBase';

export const getAllProducts: APIGatewayProxyHandler = async (event) => {
  console.log('Start invoking getAllProducts function', event);
  let db: DataBase;
  try {
    db = await connectToDataBase();
    const products = await ProductService.getAllProducts(db);
    return apiResponse(200, products);
  } catch (e) {
    console.error('Function invocation failed', e);
    return apiResponse(500, { message: e.message });
  } finally {
    await db.sequelize.close();
  }
}
