import http from 'http';
import express from 'express';
import './config/logging';
import { loggingHandler } from './middleware/loggingHandler';
import corsHandler from './middleware/corsHandler';
import routeNotFound from './middleware/routeNotFound';
import { MONGO, SERVER } from './config/config';
import 'reflect-metadata';
import { defineRoutes } from './modules/routes';
import MainController from './controllers/mainController';
import mongoose from 'mongoose';
import UserController from './features/users/users.controller';
import { declareHandler } from './middleware/declareHandler';
import AuthController from './features/auth/auth.controller';
import ProductsController from './features/products/products.controller';
import WishlistCoontroller from './features/wishlist/wishlist.controller';
import CartsController from './features/carts/carts.controller';

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const Main = async () => {
    logging.info('Initializing API');
    application.use(express.urlencoded({ extended: true }));
    application.use(express.json());

    logging.log('Connecting to Mongo');
    try {
        const connection = await mongoose.connect(MONGO.MONGO_CONNECTION, MONGO.MONGO_OPTIONS);
        logging.log('Connected to Mongo', connection.version);
    } catch (error) {
        logging.log('Unable to Connect to Mongo');
        logging.error(error);
    }

    logging.info('Logging & Configuration');
    application.use(declareHandler);
    application.use(loggingHandler);
    application.use(corsHandler);

    logging.info('Defining Controller Routing');
    defineRoutes([MainController, CartsController, WishlistCoontroller, ProductsController, UserController, AuthController], application);

    logging.info('Router Not Found');
    application.use(routeNotFound);

    logging.info('Start Server');
    httpServer = http.createServer(application);
    httpServer.listen(SERVER.SERVER_PORT, () => {
        logging.info('Server Started at: http://' + SERVER.SERVER_HOSTNAME + ':' + SERVER.SERVER_PORT);
    });
};

export const Shutdown = (callback: any) => {
    httpServer && httpServer.close(callback);
};

Main();
