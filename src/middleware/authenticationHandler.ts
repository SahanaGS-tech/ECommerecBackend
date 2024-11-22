import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT } from '../config/config';
import { Users } from '../users/users.entity';

export const authenticationHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Access token missing' });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT.JWT_ACCESS_SECRET!) as { id: string };
        const user = await Users.findOne({ _id: decoded.id });
        req.user = user;
        console.log('user check', decoded);
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired access token' });
    }
};
