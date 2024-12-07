import { Request, Response, NextFunction } from 'express';
import AuthService from '../auth/auth.services';
import UsersServices from '../users/users.services';
import { Wishlist } from './wishlist.entity';
import { v4 as uuidv4 } from 'uuid';
class WishlistServices {
    async addProductToWishlist(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const User = await AuthService.getUserByAccessToken(req, res, next);
            const userId = User?.id;
            const isUserExist = await Wishlist.find({ userId: userId });
            // if the user have wishlist update that otherwise create new and update
            if (isUserExist.length) {
                const wishlistId = isUserExist[0]._id.toString();
                const Wishlist = this.updateWishlist(wishlistId, req);
                logging.info('Wishlist updated for the user');
                return Wishlist;
            } else {
                const newWishlist = await this.createWishlist(userId, req);
                logging.info('Wishlist created for the user');
                UsersServices.addWishlistIdToUser(userId, newWishlist._id);
                return newWishlist;
            }
        } catch (error) {
            console.error('Error adding product to wishlist:', error);
            throw new Error('Error updating wishlist');
        }
    }
    async createWishlist(userId: string, req: Request): Promise<any> {
        const products = req.body.products;
        const uniqueProducts = [...new Set(products)];
        const document = await new Wishlist({
            _id: uuidv4(),
            userId: userId,
            products: uniqueProducts
        });
        await document.save();
        return document;
    }
    async updateWishlist(wishlistId: string, req: Request): Promise<any> {
        return await Wishlist.findByIdAndUpdate(wishlistId, { $addToSet: { products: req.body.products } }, { new: true, upsert: true });
    }
}
export default new WishlistServices();
