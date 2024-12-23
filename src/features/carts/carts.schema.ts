import { Schema } from 'mongoose';

export const cartSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        require: true
    },
    userId: {
        type: String,
        require: true,
        ref: 'users',
        unique: true
    },
    cartItems: [
        {
            productId: {
                type: String,
                ref: 'products',
                require: true
            },
            quantity: {
                type: Number,
                require: true
            }
        }
    ]
});
