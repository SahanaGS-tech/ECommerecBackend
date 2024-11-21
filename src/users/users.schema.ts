import { Schema } from 'mongoose';
export const usersSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true
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
            type: String,
            unique: true
        }
    },
    {
        timestamps: true
    }
);
