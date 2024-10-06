import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';

dotenv.config ();

const databaseUrl = process.env.DB_URL;

const sequelize = databaseUrl
  ? new Sequelize (databaseUrl, {
      logging: false,
      dialectOptions: {
        keepAlive: true,
        ssl: process.env.DB_SSL === 'true'
          ? {require: true, rejectUnauthorized: false}
          : false,
      },
    })
  : new Sequelize (
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        port: process.env.DB_PORT || 5432,
        logging: false,
        dialectOptions: {
          ssl: process.env.DB_SSL === 'true'
            ? {require: true, rejectUnauthorized: false}
            : false,
          keepAlive: true,
        },
      }
    );

export default sequelize;
