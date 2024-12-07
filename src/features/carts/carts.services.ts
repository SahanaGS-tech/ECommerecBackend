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
            const cart = await this.updateCartItems(cartId, userId, cartItems);
            return cart;
        } catch (error) {
            console.error('Error adding product to cart:', error);
            throw new Error('Error adding cart');
        }
    }
    // TODO: Check the Logic for the below endpoint
    async updateProductsToCart(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { cartItems } = req.body;
            const User = await AuthService.getUserByAccessToken(req, res, next);
            const userId = User?.id;
            const isUserExist = await Carts.find({ userId: userId });
            const cartId = isUserExist[0]?._id.toString() || '';

            if (cartItems.updatedItems.length > 0) {
                console.log('update');
                await this.updateCartItems(cartId, userId, cartItems.updatedItems);
            }
            if (cartItems.deletedItems.length > 0) {
                console.log('delete');
                await this.deleteProductsFromCart(cartId, cartItems.deletedItems);
            }
        } catch (error) {
            console.error('Error updating product to cart:', error);
            throw new Error('Error updating cart');
        }
    }

    async updateCartItems(cartId: string, userId: string, cartItems: any): Promise<any> {
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
    async deleteProductsFromCart(cartId: string, products: any) {
        try {
            const productIds = products.map((product: any) => product.productId);

            return await Carts.findOneAndUpdate(
                { _id: cartId },
                { $pull: { cartItems: { productId: { $in: productIds }, quantity: { $in: 0 } } } },
                { new: true }
            );
        } catch (error) {
            console.error('Error deleting product to cart:', error);
            throw new Error('Error deleting cart');
        }
    }
    // TODO: Create a clear cart endpoint for this.
    async clearCart(cartId: string) {
        try {
            return await Carts.findByIdAndDelete({ cartId });
        } catch (error) {
            console.error('Error clearing cart:', error);
            throw new Error('Error clearing cart');
        }
    }
}
export default new CartsServices();
