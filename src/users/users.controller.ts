import { Request, Response, NextFunction } from 'express';
import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';
import Joi from 'joi';
import { Validate } from '../decorators/vaidate';
import { Users } from './users.entity';
import MongoCreate from '../decorators/mongooseDecorators/create';
import { MongoGet } from '../decorators/mongooseDecorators/get';
import { MongoQuery } from '../decorators/mongooseDecorators/query';

const userDeatilsValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});
@Controller('/user')
class UserController {
    @Route('post', '/create-user')
    @Validate(userDeatilsValidation)
    @MongoCreate(Users)
    createUser(req: Request, res: Response, next: NextFunction) {
        logging.info('User Created Successfully');
        return res.status(201).json(req.mongoCreate);
    }
    @Route('post', '/get-user')
    @MongoQuery(Users)
    getUserByEmail(req: Request, res: Response, next: NextFunction) {
        logging.info('User Found');
        return res.status(200).json(req.mongoQuery);
    }
}

export default UserController;
