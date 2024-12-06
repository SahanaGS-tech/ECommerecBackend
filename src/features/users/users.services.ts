import { Users } from './users.entity';

class UsersServices {
    addWishlistIdToUser(userId: string, wishlistId: string) {
        Users.findByIdAndUpdate(userId, { wishlist: wishlistId });
    }
}
export default new UsersServices();
