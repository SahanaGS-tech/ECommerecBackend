import { Request, Response, NextFunction } from 'express';
import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';
import Joi from 'joi';
import { Validate } from '../decorators/vaidate';
import AuthService from './auth.services';

const validateUser = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
});

@Controller('/auth')
class AuthController {
    @Route('post', '/login')
    @Validate(validateUser)
    userLogin(req: Request, res: Response, next: NextFunction) {
        AuthService.login(req.body.email, req.body.password, res);
    }
}

export default AuthController;
