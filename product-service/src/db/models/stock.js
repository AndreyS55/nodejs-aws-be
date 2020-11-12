'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    static associate(models) {
      // define association here
    }
  };
  Stock.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV4,
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
    sequelize,
    modelName: 'Stock',
  });
  return Stock;
};
