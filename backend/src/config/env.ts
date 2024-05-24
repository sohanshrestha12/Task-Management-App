import * as dotenv from 'dotenv';

dotenv.config();

export default {
  mongoDbUrlConnection: process.env.MONGO_URL,
  port: process.env.PORT ? parseInt(process.env.PORT) : 5000,
  authEmail: process.env.OTP_AUTH_EMAIL,
  authPassword: process.env.OTP_AUTH_PASSWORD,
  accessKeySecret: process.env.ACCESS_TOKEN || 'access',
  refreshKeySecret:process.env.REFRESH_TOKEN || 'refresh'
};
