import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';
import { Request, Response, NextFunction } from 'express';
import WishlistServices from './wishlist.services';

@Controller('/wishlist')
class WishlistCoontroller {
    @Route('post', '/add-to-wishlist', true)
    async ProductsToWishlist(req: Request, res: Response, next: NextFunction) {
        WishlistServices.addProductToWishlist(req, res, next);
        return res.status(201).json('Added to wishlist');
    }
    // TODO:Create another endpoint to get all the products from the wishlist with wishlistID.
}
export default WishlistCoontroller;
