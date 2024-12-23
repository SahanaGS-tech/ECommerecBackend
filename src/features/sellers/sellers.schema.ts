import mongoose from 'mongoose';

export const sellersSchema = new mongoose.Schema({
    _id: {
        type: String,
        require: true
    },
    sellersName: {
        type: String,
        require: true
    },
    sellerAddress: {
        type: String,
        require: true
    }
});
