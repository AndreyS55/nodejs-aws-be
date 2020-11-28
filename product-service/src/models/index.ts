import { Sequelize } from 'sequelize';
import { DataBase } from '../interfaces/dataBase';

export const createModels = (sequelize: Sequelize): DataBase => {
  const db: DataBase = {
    sequelize
  };

  const modules = [
    require('./product').default,
    require('./stock').default,
  ];
  modules.forEach(module => {
    const model = module(sequelize);
    db[model.name] = model;
  });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return db;
};
