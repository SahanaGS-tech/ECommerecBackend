import { Request, Response, NextFunction } from 'express';
import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';
import Joi from 'joi';
import { Validate } from '../decorators/vaidate';
import { Products } from './products.entity';
import MongoCreate from '../decorators/mongooseDecorators/create';
import { MongoGetAll } from '../decorators/mongooseDecorators/getAll';
import { MongoQuery } from '../decorators/mongooseDecorators/query';

const productsDeatilsValidation = Joi.object({
    id: Joi.string().required(),
    productName: Joi.string().required(),
    primaryCategory: Joi.string().required(),
    secondaryCategory: Joi.string().required(),
    gender: Joi.string().required(),
    articleType: Joi.string().required(),
    season: Joi.string().required(),
    usage: Joi.string().required(),
    primaryColor: Joi.string().required(),
    imageUrl: Joi.string().required()
});
@Controller('/products')
class ProductsController {
    @Route('post', '/add-products', true)
    @Validate(productsDeatilsValidation)
    @MongoCreate(Products)
    addProducts(req: Request, res: Response, next: NextFunction) {
        logging.info('Product added successfully');
        return res.status(201).json(req.mongoCreate);
    }

    @Route('get', '/get-products', true)
    @MongoGetAll(Products)
    getProducts(req: Request, res: Response, next: NextFunction) {
        logging.info('Products fetched successfully');
        return res.status(200).json(req.mongoGetAll);
    }
    @Route('post', '/get-products-by-value', true)
    @MongoQuery(Products)
    async getProductsByValue(req: Request, res: Response, next: NextFunction) {
        try {
            return res.status(200).json(req.mongoQuery);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default ProductsController;
