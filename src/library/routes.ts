// Using as a type in Routes Decorator

import { Express, RequestHandler } from 'express';

export type RouteHandler = Map<keyof Express, Map<string, RequestHandler[]>>;
