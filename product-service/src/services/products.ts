import { Sequelize } from 'sequelize';
import { DataBase } from '../interfaces/dataBase';
import { ProductModel } from '../models/product';

export const getAllProducts = async (db: DataBase): Promise<ProductModel[]> => {
  try {
    const products = await db.Product.findAll({
      attributes: {
        include: [[Sequelize.literal('"Stock"."count"'), 'count']],
      },
      include: [{
        model: db.Stock,
        attributes: [],
        required: true,
      }]
    });
    return products;
  } catch (e) {
    throw e;
  }
}

export const getProductById = async (db: DataBase, id: string): Promise<ProductModel> => {
  try {
    const product = await db.Product.findByPk(id, {
      attributes: {
        include: [[Sequelize.literal('"Stock"."count"'), 'count']],
      },
      include: [{
        model: db.Stock,
        attributes: [],
        required: true,
      }]
    });
    return product;
  } catch (e) {
    throw e;
  }
}
