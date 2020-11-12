import { Sequelize } from 'sequelize';
import { DataBase } from '../interfaces/dataBase';
import { ProductModel } from '../models/product';
import { Product } from '../interfaces/product';

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

export const createProduct = async (db: DataBase, body: Product): Promise<ProductModel> => {
  try {
    const { title, description, price, imageUrl, count } = body;
    const result = await db.sequelize.transaction(async (t) => {
      const product = await db.Product.create({
        title,
        description,
        price,
        imageUrl,
      }, { transaction: t });

      await product.createStock({
        count,
      }, { transaction: t });

      return await db.Product.findByPk(product.id, {
        attributes: {
          include: [[Sequelize.literal('"Stock"."count"'), 'count']],
        },
        include: [{
          model: db.Stock,
          attributes: [],
          required: true,
        }],
        transaction: t,
      });
    });
    return result;
  } catch (e) {
    throw e;
  }
}
