import { Users } from './users.entity';

class UsersServices {
    async addWishlistIdToUser(userId: string, wishlistId: string) {
        try {
            await Users.findByIdAndUpdate(userId, { wishlist: wishlistId }, { new: true });
        } catch (error) {
            logging.error(`Error updating the wishlistId ${error}`);
        }
    }
    async addCartIdToUser(userId: string, cartId: string) {
        try {
            await Users.findByIdAndUpdate(userId, { cart: cartId }, { new: true });
        } catch (error) {
            logging.error(`Error updating the cartId ${error}`);
        }
    }
}
export default new UsersServices();
