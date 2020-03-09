const db = require('_helpers/db');
const Country = db.Country;

module.exports = {
    getAll
};

async function getAll() {
    return await Country.find().select('-hash');
}
