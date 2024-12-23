import { Schema } from 'mongoose';

export const reviewsSchema = new Schema(
    {
        _id: {
            type: String,
            require: true
        },
        customerName: {
            type: String,
            require: true
        },
        customerRating: {
            type: Number,
            require: true
        },
        customerComments: {
            type: String,
            require: true
        },
        imageUrl: {
            type: [String]
        }
    },
    {
        timestamps: true
    }
);
