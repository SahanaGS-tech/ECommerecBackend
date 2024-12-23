import mongoose from 'mongoose';
import { sellersSchema } from './sellers.schema';

export const Sellers = mongoose.model('sellers', sellersSchema);
