import { config } from 'dotenv';

const envFound = config();
if (!envFound) {
  // This error should crash whole process
  throw new Error("Couldn't find .env file");
}

export default {
  port: parseInt(process.env.PORT || '3000', 10),
};
