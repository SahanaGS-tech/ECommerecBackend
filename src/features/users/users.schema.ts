import mongoose, { Schema } from 'mongoose';

export const usersSchema = new Schema(
    {
        _id: {
            type: String,
            require: true
        },
        name: {
            type: String,
            require: true
        },
        role: {
            type: String,
            require: true,
            enum: ['user', 'admin'],
            default: 'user'
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true
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
