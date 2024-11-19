import { Request, Response, NextFunction } from 'express';
import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';
import Joi from 'joi';
import { Validate } from '../decorators/vaidate';
import login from './auth.services';

const validateUser = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
});

@Controller('/auth')
class AuthController {
    @Route('post', '/login')
    @Validate(validateUser)
    userLogin(req: Request, res: Response, next: NextFunction) {
        login(req, res);
    }
}

export default AuthController;
