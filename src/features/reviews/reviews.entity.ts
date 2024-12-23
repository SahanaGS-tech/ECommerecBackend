import mongoose from 'mongoose';
import { reviewsSchema } from './reviews.schema';

export const Reviews = mongoose.model('reviews', reviewsSchema);
