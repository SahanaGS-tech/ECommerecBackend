import { Express, RequestHandler } from 'express';
import { RouteHandler } from '../library/routes';
import { authenticationHandler } from '../middleware/authenticationHandler';

export function Route(method: keyof Express, path: string = '', requiredAuth: boolean, ...middleware: RequestHandler[]) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        const routePath = path;
        const routeHandlers: RouteHandler = Reflect.getMetadata('routeHandlers', target) || new Map();

        if (!routeHandlers.has(method)) {
            routeHandlers.set(method, new Map());
        }

        if (requiredAuth) {
            middleware.unshift(authenticationHandler);
        }
        routeHandlers.get(method)?.set(routePath, [...middleware, descriptor.value]);

        Reflect.defineMetadata('routeHandlers', routeHandlers, target);
    };
}
