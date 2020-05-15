const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    googleId: { type: String, unique: true, required: true },
    restaurantName: { type: String, unique: false, required: true },
    restaurantAddress: { type: String, unique: false, required: true },
    restaurantAvatar: { type: String, unique: false, required: true },
    hash: { type: String, required: false },
    createdDate: { type: Date, default: Date.now },
    avatar   : { type: mongoose.Schema.Types.Mixed, required: false }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);
