import dotenv from "dotenv";

dotenv.config({
  path: "../../.env",
});

export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 9000;
export const API_URL = process.env.API_URL || "";
export const ALLOWED_CLIENTS = process.env.ALLOWED_CLIENTS?.split(
  ",",
) as unknown as string;
export const MONGO_URL = process.env.MONGO_URL as unknown as string;
export const REDIS_URL = process.env.REDIS_URL || "";
export const WEB_URL = process.env.WEB_URL || "";
export const NODE_ENV = process.env.NODE_ENV || ''
export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY || ''
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || ''
export const AWS_REGION = process.env.AWS_REGION || ''
