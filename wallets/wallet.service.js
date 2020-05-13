const db = require('_helpers/db');
const Wallet = db.Wallet;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Wallet.find().select('-hash');
}

async function getById(id) {
    return await Wallet.findById(id).select('-hash');
}

async function create(walletParam) {
    // validate
    // if (await Wallet.findOne({ username: userParam.username })) {
    //     throw 'Username "' + userParam.username + '" is already taken';
    // }

    const wallet = new Wallet(walletParam);

    // hash password
    // if (userParam.password) {
    //     user.hash = bcrypt.hashSync(userParam.password, 10);
    // }

    // save user
    await wallet.save();
}

async function update(UserId, walletParam) {
    const wallet = await Wallet.findById(UserId);


    // validate
    // if (!user) throw 'User not found';
    // if (user.username !== userParam.username && await Wallet.findOne({ username: userParam.username })) {
    //     throw 'Username "' + userParam.username + '" is already taken';
    // }

    // hash password if it was entered
    // if (userParam.password) {
    //     userParam.hash = bcrypt.hashSync(userParam.password, 10);
    // }

    // copy userParam properties to user
    Object.assign(wallet, walletParam);

    await wallet.save();
}

async function _delete(id) {
    await Wallet.findByIdAndRemove(id);
}
