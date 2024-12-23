import { Schema } from 'mongoose';

export const reviewsSchema = new Schema(
    {
        _id: {
            type: String,
            required: true
        },
        customerName: {
            type: String,
            required: true
        },
        customerRating: {
            type: Number,
            required: true
        },
        customerComments: {
            type: String,
            required: true
        },
        imageUrl: {
            type: [String]
        }
    },
    {
        timestamps: true
    }
);
