import {
  Sequelize,
  Model,
  DataTypes,
  BuildOptions,
  HasOneGetAssociationMixin,
  HasOneCreateAssociationMixin,
} from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { DataBase } from '../interfaces/dataBase';
import { StockModel } from './stock';

export interface ProductModel extends Model {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  count: number;

  getStock: HasOneGetAssociationMixin<StockModel>;
  createStock: HasOneCreateAssociationMixin<StockModel>;
}

export type ProductModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ProductModel;
  associate: (db: DataBase) => void;
}

export default (sequelize: Sequelize): ProductModelStatic => {
  const Product =  sequelize.define('Product', {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4(),
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageUrl: DataTypes.STRING,

  }, {
    createdAt: false,
    updatedAt: false,
  }) as ProductModelStatic;

  Product.associate = (db): void => {
    Product.hasOne(db.Stock, {
      foreignKey: 'productId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Product;
};
