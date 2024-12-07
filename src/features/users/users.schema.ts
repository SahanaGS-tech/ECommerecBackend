import mongoose, { Schema } from 'mongoose';

export const usersSchema = new Schema(
    {
        _id: {
            type: String,
            required: true
        },
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
            type: String,
            default: null
        },
        cart: {
            type: String,
            default: null
        },
        orders: {
            type: [String]
        }
    },
    {
        timestamps: true
    }
);
