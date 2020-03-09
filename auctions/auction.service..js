const db = require('_helpers/db');
const Auction = db.Auction;

module.exports = {
    getAll
};



async function getAll() {
    return await Auction.find().select('-hash');
}
