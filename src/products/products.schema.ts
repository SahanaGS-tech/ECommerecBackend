import { Schema } from 'mongoose';

export const productsSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    productName: {
        type: String,
        required: true
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
    }
});
