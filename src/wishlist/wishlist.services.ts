import { Request, Response, NextFunction } from 'express';
import AuthService from './../auth/auth.services';
import UsersServices from './../users/users.services';
import { Wishlist } from './wishlist.entity';
import { v4 as uuidv4 } from 'uuid';
import mongoose, { ObjectId } from 'mongoose';
class WishlistServices {
    async addProductToWishlist(req: Request, res: Response, next: NextFunction) {
        try {
            const User = await AuthService.getUserByAccessToken(req, res, next);
            const userId = User?.id;
            const isUserExist = await Wishlist.find({ userId: userId });
            // if the user have wishlist update that otherwise create new and update
            if (isUserExist.length) {
                const wishlistId = isUserExist[0]._id.toString();
                this.updateWishlist(wishlistId, req);
                console.log('Wishlist updated for the user');
            } else {
                this.createWishlist(userId, req);
                console.log('Wishlist created for the user');
            }

            // After creating wishlist link the wishlist id to the user.
            UsersServices.addWishlistIdToUser(userId, '');
        } catch (error) {
            console.error('Error adding product to wishlist:', error);
            throw new Error('Error updating wishlist');
        }
    }
    async createWishlist(userId: string, req: Request) {
        const products = req.body.products;
        const uniqueProducts = [...new Set(products)];
        const document = await new Wishlist({
            _id: uuidv4(),
            userId: userId,
            products: uniqueProducts
        });
        await document.save();
        return;
    }
    async updateWishlist(wishlistId: string, req: Request) {
        await Wishlist.findByIdAndUpdate(wishlistId, { $addToSet: { products: req.body.products } }, { new: true, upsert: true });
        return;
    }
}
export default new WishlistServices();
