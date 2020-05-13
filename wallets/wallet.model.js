const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    userId: { type: String, unique: false, required: false },
    BTC: { type: String, unique: false, required: false },
    LTH: { type: String, unique: false, required: false },
    ETH: { type: String, unique: false, required: false },
    hash: { type: String, required: false }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Wallet', schema);
