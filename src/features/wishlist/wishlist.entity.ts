import mongoose from 'mongoose';
import { wishlistSchema } from './wishlist.schema';

export const Wishlist = mongoose.model('wishlist', wishlistSchema);
