const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Auction: require('../auctions/auction.model'),
    Country: require('../countries/country.model'),
    Transaction: require('../transactions/transaction.model'),
    Wallet: require('../wallets/wallet.model')
};
