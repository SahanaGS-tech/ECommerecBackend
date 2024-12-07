import { Request, Response, NextFunction } from 'express';
import AuthService from './../auth/auth.services';
import { Carts } from './carts.entity';
import { v4 as uuidv4 } from 'uuid';

class CartsServices {
    async addProductsToCart(req: Request, res: Response, next: NextFunction) {
        try {
            const { cartItems } = req.body;
            const User = await AuthService.getUserByAccessToken(req, res, next);
            const userId = User?.id;
            const isUserExist = await Carts.find({ userId: userId });
            const cartId = isUserExist[0]?._id.toString() || '';
            const cart = await this.addCartItems(cartId, userId, cartItems);
            return cart;
        } catch (error) {
            console.error('Error adding product to cart:', error);
            throw new Error('Error adding cart');
        }
    }

    async updateProductsToCart(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { cartItems } = req.body;
            const User = await AuthService.getUserByAccessToken(req, res, next);
            const userId = User?.id;
            const isUserExist = await Carts.find({ userId: userId });
            const cartId = isUserExist[0]?._id.toString() || '';

            if (cartItems.updatedItems.length) {
                await this.updateCartItems(cartId, userId, cartItems.updatedItems);
            }
            if (cartItems.deletedItems.length) {
                await this.deleteProductsFromCart(cartId, cartItems.deletedItems);
            }
            return await Carts.find({ userId: userId });
        } catch (error) {
            console.error('Error updating product to cart:', error);
            throw new Error('Error updating cart');
        }
    }

    async addCartItems(cartId: string, userId: string, cartItems: any): Promise<any> {
        const cart = await Carts.findById(cartId);

        if (!cart) {
            return await Carts.create({ _id: uuidv4(), userId: userId, cartItems: cartItems });
        }

        cartItems.forEach((newItem: any) => {
            const existingItem = cart.cartItems.find((item) => item.productId === newItem.productId);
            if (existingItem) {
                existingItem.quantity += newItem.quantity;
            } else {
                cart.cartItems.push(newItem);
            }
        });

        return await cart.save();
    }
    async updateCartItems(cartId: string, userId: string, cartItems: any[]): Promise<void> {
        try {
            if (!userId || !cartId) {
                throw new Error('Invalid input: userId or cartId missing');
            }

            const cart = await Carts.findById(cartId);
            if (!cart) {
                throw new Error(`Cart not found for cartId: ${cartId}`);
            }

            const existingItemsMap = new Map(cart.cartItems.map((item) => [item.productId, item]));

            cartItems.forEach((newItem) => {
                const existingItem = existingItemsMap.get(newItem.productId);
                if (existingItem) {
                    existingItem.quantity = newItem.quantity;
                } else {
                    cart.cartItems.push(newItem);
                }
            });
            await cart.save();
        } catch (error) {
            logging.error('Error updating the cart:', { error, userId, cartId });
            throw new Error(`Error updating the cart: ${error}`);
        }
    }

    async deleteProductsFromCart(cartId: string, products: any) {
        try {
            return await Carts.findOneAndUpdate({ _id: cartId }, { $pull: { cartItems: { productId: { $in: products } } } }, { new: true });
        } catch (error) {
            console.error('Error deleting product to cart:', error);
            throw new Error('Error deleting cart');
        }
    }
}
export default new CartsServices();
