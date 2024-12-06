import { Request, Response, NextFunction } from 'express';
import mongoose, { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export function MongoCreate(model: Model<any>) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            try {
                if (req.body.password) {
                    const saltRounds = 10;
                    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
                }
                const document = await new model({
                    _id: uuidv4(),
                    ...req.body
                });
                await document.save();
                req.mongoCreate = document;
            } catch (error) {
                logging.error(error);
                return res.status(400).json(error);
            }
            return originalMethod.call(this, req, res, next);
        };
        return descriptor;
    };
}
export default MongoCreate;
