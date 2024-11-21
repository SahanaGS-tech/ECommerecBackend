import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export const DEVELOPMENT = process.env.NODE_ENV === 'development';
export const TEST = process.env.NODE_ENV === 'test';
export const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
export const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 5000;
export const MONGO_USER = process.env.MONGO_USER || '';
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
export const MONGO_DATABASE = process.env.MONGO_DATABASE || '';
export const MONGO_URL = process.env.MONGO_URL || '';
export const MONGO_OPTIONS: mongoose.ConnectOptions = { retryWrites: true, w: 'majority' };
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || '';
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || '';
export const JWT_ACCESS_EXPIRY = process.env.JWT_ACCESS_EXPIRY || '';
export const JWT_REFRESH_EXPIRY = process.env.JWT_REFRESH_EXPIRY || '';

export const JWT = {
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    JWT_ACCESS_EXPIRY,
    JWT_REFRESH_EXPIRY
};
export const MONGO = {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_DATABASE,
    MONGO_URL,
    MONGO_OPTIONS,
    MONGO_CONNECTION: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_DATABASE}`
};

export const SERVER = {
    SERVER_HOSTNAME,
    SERVER_PORT
};
