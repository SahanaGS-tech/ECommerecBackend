import { Request, Response, NextFunction } from 'express';
import { Controller } from '../../decorators/controller';
import { Route } from '../../decorators/route';
import Joi from 'joi';
import { Validate } from '../../decorators/vaidate';
import { Users } from './users.entity';
import MongoCreate from '../../decorators/mongooseDecorators/create';

const userDeatilsValidation = Joi.object({
    name: Joi.string().required(),
    role: Joi.string().valid('user', 'admin').required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});
@Controller('/user')
class UserController {
    @Route('post', '/register', false)
    @Validate(userDeatilsValidation)
    @MongoCreate(Users)
    createUser(req: Request, res: Response, next: NextFunction) {
        try {
            logging.info('User Created Successfully');
            return res.status(201).json(req.mongoCreate);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default UserController;
