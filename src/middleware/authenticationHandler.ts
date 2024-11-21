import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT } from '../config/config';

export const authenticationHandler = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Access token missing' });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT.JWT_ACCESS_SECRET!);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired access token' });
    }
};
