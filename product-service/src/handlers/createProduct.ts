import { APIGatewayProxyHandler } from 'aws-lambda';
import apiResponse from '../utils/apiResponses';
import connectToDataBase from '../utils/connectToDataBase';
import * as ProductService from '../services/products';
import { DataBase } from '../interfaces/dataBase';
import * as ProductValidator from '../validators/productValidator';
import util from 'util';

export const createProduct: APIGatewayProxyHandler = async (event) => {
  console.log('Start invoking createProduct function', util.inspect(event, { depth: 5 }));
  let db: DataBase;
  try {
    db = await connectToDataBase();
    const body = JSON.parse(event.body);
    const validation = ProductValidator.isValid(body);
    if (validation.error) {
      return apiResponse(400, { message: validation.error.message });
    }
    const product = await ProductService.createProduct(db, body);
    return apiResponse(201, product);
  } catch (e) {
    console.error('Function invocation failed', e);
    return apiResponse(500, { message: e.message });
  } finally {
    await db.sequelize.close();
  }
}
