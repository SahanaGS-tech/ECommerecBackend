import { Request, Response, NextFunction } from 'express';
import AuthService from './../auth/auth.services';
import { Wishlist } from './wishlist.entity';
import { Users } from '../users/users.entity';
import UsersServices from './../users/users.services';

class WishlistServices {
    async addProductToWishlist(req: Request, res: Response, next: NextFunction) {
        try {
            const User = await AuthService.getUserByAccessToken(req, res, next);
            // TODO : Need to check for the userid in the wishlist if yes then update that with products else create wishlist and add products.
            // After creating wishlist link the wishlist id to the user.
            UsersServices.addWishlistIdToUser(User?.id, '');
        } catch (error) {
            console.error('Error adding product to wishlist:', error);
            throw new Error('Error updating wishlist');
        }
    }
}
export default new WishlistServices();
