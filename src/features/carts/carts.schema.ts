import { Schema } from 'mongoose';

export const cartSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        required: true
    },
    userId: {
        type: String,
        required: true,
        ref: 'users',
        unique: true
    },
    cartItems: [
        {
            productId: {
                type: String,
                ref: 'products',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
});
