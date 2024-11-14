import http from 'http';
import express from 'express';
import './config/logging';
import { loggingHandler } from './middleware/loggingHandler';
import corsHandler from './middleware/corsHandler';
import routeNotFound from './middleware/routeNotFound';
import { SERVER } from './config/config';
import 'reflect-metadata';
import { defineRoutes } from './modules/routes';
import MainController from './controllers/mainController';

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = () => {
    logging.info('Initializing API');
    application.use(express.urlencoded({ extended: true }));
    application.use(express.json());

    logging.info('Logging & Configuration');
    application.use(loggingHandler);
    application.use(corsHandler);

    logging.info('Defining Controller Routing');
    defineRoutes([MainController], application);

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
