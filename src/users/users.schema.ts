import mongoose, { Schema } from 'mongoose';

export const usersSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: ['user', 'admin'],
            default: 'user'
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        refreshToken: {
            type: String
        },
        wishlist: {
            type: mongoose.Schema.Types.ObjectId
        },
        cart: {
            type: mongoose.Schema.Types.ObjectId
        },
        orders: {
            type: [mongoose.Schema.Types.ObjectId]
        }
    },
    {
        timestamps: true
    }
);
