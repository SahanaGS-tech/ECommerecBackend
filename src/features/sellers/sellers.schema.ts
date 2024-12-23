import mongoose from 'mongoose';

export const sellersSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    sellersName: {
        type: String,
        required: true
    },
    sellerAddress: {
        type: String,
        required: true
    }
});
