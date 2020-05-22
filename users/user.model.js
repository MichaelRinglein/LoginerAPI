const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    username: { type: String, unique: false, required: true },
    email: { type: String, unique: true, required: true },
    googleId: { type: String, unique: true, required: true },
    referral: { type: String, unique: false, required: false },
    restaurantName: { type: String, unique: false, required: true },
    restaurantAddress: { type: String, unique: false, required: true },
    restaurantAvatar: { type: String, unique: false, required: true },
    restaurantReviewImg: { type: String, unique: false, required: true },
    restaurantReviewCounter: { type: Number, unique: false, required: true, value: 0 },
    restaurantVoucherName: { type: String, unique: false, required: true },
    restaurantVoucherImg: { type: String, unique: false, required: true },
    restaurantVoucherCode: { type: String, unique: false, required: true },
    restaurantVoucherCounter: { type: Number, unique: false, required: true, value: 0 },
    admin: { type: Boolean, unique: false, required: false, value: false },
    hash: { type: String, required: false },
    createdDate: { type: Date, default: Date.now },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);
