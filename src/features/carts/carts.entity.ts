import mongoose from 'mongoose';
import { cartSchema } from './carts.schema';

export const Carts = mongoose.model('carts', cartSchema);
