import { Sequelize } from 'sequelize';
import { ProductModelStatic } from '../models/product';
import { StockModelStatic } from '../models/stock';

export interface DataBase {
  sequelize: Sequelize;
  Product?: ProductModelStatic;
  Stock?: StockModelStatic;
  [key: string]: any;
}
