import { Request, Response, NextFunction, RequestHandler } from 'express';

const routeNotFound: RequestHandler = (req: Request, res: Response, next: NextFunction): any => {
    const error = new Error('Route Not Found');
    logging.error(error);
    return res.status(404).json({ error: error.message });
};

export default routeNotFound;
