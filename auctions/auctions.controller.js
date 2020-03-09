const express = require('express');
const router = express.Router();
const auctionService = require('./auction.service.');

// routes
router.get('/', getAll);
module.exports = router;


function getAll(req, res, next) {
    auctionService.getAll()
        .then(auctions => res.json(auctions))
        .catch(err => next(err));
}
