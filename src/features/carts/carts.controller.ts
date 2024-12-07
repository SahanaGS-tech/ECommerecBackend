import { NextFunction, Request, Response } from 'express';
import { Controller } from '../../decorators/controller';
import { Route } from '../../decorators/route';
import { Validate } from '../../decorators/vaidate';
import { cartDetailsValidator } from './carts.validation';
import cartsServices from './carts.services';
import { Carts } from './carts.entity';
import { MongoGet } from '../../decorators/mongooseDecorators/get';

@Controller('/carts')
class CartsController {
    @Route('post', '/add-to-cart', true)
    @Validate(cartDetailsValidator)
    async addToCart(req: Request, res: Response, next: NextFunction) {
        try {
            const document = await cartsServices.addProductsToCart(req, res, next);
            return res.status(200).json(document);
        } catch (error) {
            return res.status(500).json('Internal Server Error');
        }
    }
    @Route('patch', '/update-cart', true)
    async updateCart(req: Request, res: Response, next: NextFunction) {
        try {
            const document = cartsServices.updateProductsToCart(req, res, next);
            return res.status(200).json(document);
        } catch (error) {
            return res.status(500).json('Internal Server Error');
        }
    }
    @Route('get', '/get-cart-products/:id', true)
    @MongoGet(Carts)
    async getProductsFromCarts(req: Request, res: Response, next: NextFunction) {
        try {
            return res.status(200).json(req.mongoGet);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default CartsController;
