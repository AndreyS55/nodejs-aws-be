import dotenv from 'dotenv';

const envFound = dotenv.config();
if (!envFound) {
  throw new Error("Couldn't find .env file");
}

export default {
  weatherApi: {
    url: process.env.API_URL,
    key: process.env.API_KEY,
  }
};
