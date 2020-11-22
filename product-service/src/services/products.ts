import { Sequelize } from 'sequelize';
import { DataBase } from '../interfaces/dataBase';
import { ProductModel } from '../models/product';
import { Product } from '../interfaces/product';
import { v4 as uuidv4 } from 'uuid';

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

export const createProduct = async (db: DataBase, body: Product): Promise<Product> => {
  try {
    const { title, description, price, imageUrl, count } = body;
    const result = await db.sequelize.transaction(async (t) => {
      const product = await db.Product.create({
        id: uuidv4(), // set id manually because sequelize doesn't update it when create in loop
        title,
        description,
        price,
        imageUrl,
      }, { transaction: t });

      const stock = await product.createStock({
        count,
      }, { transaction: t });

      return { ...product.get(), count: stock.get('count') };
    });
    return result;
  } catch (e) {
    throw e;
  }
}
