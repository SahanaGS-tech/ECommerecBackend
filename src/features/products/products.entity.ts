import mongoose from 'mongoose';
import { productsSchema } from './products.schema';

export const Products = mongoose.model('products', productsSchema);
