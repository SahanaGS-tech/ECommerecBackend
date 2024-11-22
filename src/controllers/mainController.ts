import { Request, Response, NextFunction } from 'express';
import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';
import Joi from 'joi';
import { Validate } from '../decorators/vaidate';

const postHealthCheckValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email()
});
@Controller('/main')
class MainController {
    @Route('get', '/healthcheck', true)
    getHealthCheck(req: Request, res: Response, next: NextFunction) {
        logging.info(`HealthCheck Called Succesfully`);
        return res.status(200).json({ hello: `${req.user ? req.user.name : ''}` });
    }
}

export default MainController;
