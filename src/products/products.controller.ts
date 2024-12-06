import { Request, Response, NextFunction } from 'express';
import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';
import { Validate } from '../decorators/vaidate';
import { Products } from './products.entity';
import MongoCreate from '../decorators/mongooseDecorators/create';
import { MongoGetAll } from '../decorators/mongooseDecorators/getAll';
import { MongoQuery } from '../decorators/mongooseDecorators/query';
import { productsDeatilsValidation } from './products.validation';

@Controller('/products')
class ProductsController {
    @Route('post', '/add-products', true)
    @Validate(productsDeatilsValidation)
    @MongoCreate(Products)
    addProducts(req: Request, res: Response, next: NextFunction) {
        try {
            logging.info('Product added successfully');
            return res.status(201).json(req.mongoCreate);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    @Route('get', '/get-products', true)
    @MongoGetAll(Products)
    getProducts(req: Request, res: Response, next: NextFunction) {
        try {
            logging.info('Products fetched successfully');
            return res.status(200).json(req.mongoGetAll);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
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
