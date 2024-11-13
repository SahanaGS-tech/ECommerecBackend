import { Request, Response, NextFunction } from 'express';

const corsHandler = (req: Request, res: Response, next: NextFunction): any => {
    res.header('Access-Control-Allow-Origin', req.header('origin'));
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept,Authrization');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,PATCH,DELETE');
        return res.status(200).json({});
    }
    next();
};

export default corsHandler;
