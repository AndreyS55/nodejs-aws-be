import {
  Sequelize,
  Model,
  DataTypes,
  BuildOptions,
} from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { DataBase } from '../interfaces/dataBase';

export interface StockModel extends Model {
  id: string;
  productId: string;
  count: number;
}

export type StockModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): StockModel;
  associate: (db: DataBase) => void;
}

export default (sequelize: Sequelize): StockModelStatic => {
  const Stock =  sequelize.define('Stock', {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4(),
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Product',
        key: 'id',
      }
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    createdAt: false,
    updatedAt: false,
  }) as StockModelStatic;

  Stock.associate = (db): void => {
    Stock.belongsTo(db.Product, {
      foreignKey: 'productId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Stock;
};
