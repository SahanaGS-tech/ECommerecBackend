import { Users } from './users.entity';

class UsersServices {
    addWishlistIdToUser(userId: string, wishlistId: string) {
        Users.findByIdAndUpdate(userId, { wishlist: wishlistId });
    }
    addCartIdToUser(userId: string, cartId: string) {
        Users.findByIdAndUpdate(userId, { cart: cartId });
    }
}
export default new UsersServices();
