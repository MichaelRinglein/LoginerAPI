const express = require('express');
const router = express.Router();
const countryService = require('./country.service');

// routes
router.get('/', getAll);
module.exports = router;



function getAll(req, res, next) {
    countryService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}
