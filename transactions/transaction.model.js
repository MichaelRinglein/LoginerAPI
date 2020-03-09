const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    username: { type: String, unique: false, required: false },
    number: { type: String, unique: true, required: false },
    date: { type: Date, default: Date.now },
    description: { type: String, unique: false, required: false },
    debit: { type: String, unique: false, required: true },
    credit: { type: String, unique: false, required: false },
    status: { type: String, unique: false, required: false },
    hash: { type: String, required: false }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Transaction', schema);
