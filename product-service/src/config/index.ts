import dotenv from 'dotenv';

const envFound = dotenv.config();
if (!envFound) {
  throw new Error("Couldn't find .env file");
}

export default {
  db: {
    url: process.env.DB_URL,
    port:  parseInt(process.env.DB_PORT, 10),
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
};
