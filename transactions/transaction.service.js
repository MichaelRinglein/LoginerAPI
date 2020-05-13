const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Transaction = db.Transaction;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Transaction.find().select('-hash');
}

async function getById(id) {
    return await Transaction.findById(id).select('-hash');
}

async function create(transactionParam) {
    // validate
    // if (await Transaction.findOne({ transaction: transactionParam.transactionId })) {
    //     throw 'Username "' + transactionParam.transactionId + '" is already taken';
    // }

    const transaction = new Transaction(transactionParam);

    // hash password
    // if (transactionParam.password) {
    //     transaction.hash = bcrypt.hashSync(userParam.password, 10);
    // }

    // save user
    await transaction.save();
}

async function update(id, transactionParam) {
    const transaction = await Transaction.findById(id);

    // validate
    // if (!user) throw 'User not found';
    // if (user.username !== userParam.username && await Transaction.findOne({ username: userParam.username })) {
    //     throw 'Username "' + userParam.username + '" is already taken';
    // }

    // hash password if it was entered
    // if (userParam.password) {
    //     userParam.hash = bcrypt.hashSync(userParam.password, 10);
    // }

    // copy userParam properties to user
    Object.assign(transaction, transactionParam);

    await transaction.save();
}

async function _delete(id) {
    await Transaction.findByIdAndRemove(id);
}
