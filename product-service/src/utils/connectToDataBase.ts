import config from '../config';
import pg from 'pg';
import { Sequelize } from 'sequelize';
import { createModels } from '../models';
import { DataBase } from '../interfaces/dataBase';

export default async (): Promise<DataBase> => {
  const sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, {
    host: config.db.url,
    port: config.db.port,
    dialect: 'postgres',
    dialectModule: pg,
  });

  await sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully'))
    .catch(e => console.error('Unable to connect to the database: ', e));

  const db = createModels(sequelize);
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
  await db.sequelize.sync();

  return db;
};
