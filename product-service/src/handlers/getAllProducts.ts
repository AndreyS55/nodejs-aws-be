import { APIGatewayProxyHandler } from 'aws-lambda';
// import axios from 'axios';
// import config from '../config';
import { productList } from '../constants/productList';
import apiResponses from '../utils/apiResponses';

export const getAllProducts: APIGatewayProxyHandler = async () => {
  console.log('Start invoking getProductsList function');
  try {
    // const result = await axios.get(`${config.weatherApi.url}?q=London&appid=${config.weatherApi.key}`);
    // console.log(result.data);
    return apiResponses['200'](productList, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    });
  } catch (e) {
    console.error('Function invocation failed', e);
    return apiResponses['500']({ message: e.message });
  }
}
