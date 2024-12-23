import { Schema } from 'mongoose';
import { Sellers } from '../sellers/sellers.entity';
import { Reviews } from '../reviews/reviews.entity';

export const productsSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    sellerDetails: {
        type: String,
        required: true,
        ref: Sellers
    },
    primaryCategory: {
        type: String,
        required: true
    },
    secondaryCategory: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    articleType: {
        type: String,
        required: true
    },
    season: {
        type: String,
        required: true
    },
    usage: {
        type: String,
        required: true
    },
    primaryColor: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    customerReview: {
        type: [String],
        ref: Reviews
    }
});
