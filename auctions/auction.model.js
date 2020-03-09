const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    name: { type: String, unique: false, required: true },
    price: { type: String, unique: false, required: true },
    maxPrice: { type: String, unique: false, required: false },
    bidsLeft: { type: String, unique: false, required: false },
    hash: { type: String, required: false },
    createdDate: { type: Date, default: Date.now },
    status: { type: String, required: false },
    bimage   : { type: mongoose.Schema.Types.Mixed, required: false }

});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Auctions', schema);
