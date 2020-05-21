const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const { promisify } = require('util');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const _ = require('lodash');
const validator = require('validator');
const User = require('../users/user.model');

const randomBytesAsync = promisify(crypto.randomBytes);

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.post('/forgot', postForgot);
router.delete('/:id', _delete);

module.exports = router;


function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {

    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));

}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}


/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
function postForgot(req, res, next) {
    const validationErrors = [];
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });

    if (validationErrors.length) {
        req.flash('errors', validationErrors);
        return res.redirect('/forgot');
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });

    const createRandomToken = randomBytesAsync(16)
        .then((buf) => buf.toString('hex'));

    const setRandomToken = (token) =>
        User
            .findOne({ email: req.body.email })
            .then((user) => {
                if (!user) {
                    req.flash('errors', { msg: 'Account with that email address does not exist.' });
                } else {
                    user.passwordResetToken = token;
                    user.passwordResetExpires = Date.now() + 3600000; // 1 hour
                    user = user.save();
                }
                return user;
            });

    const sendForgotPasswordEmail = (user) => {
        if (!user) { return; }
        const token = user.passwordResetToken;
        let transporter = nodemailer.createTransport({
            service: 'SendGrid',
            auth: {
                user: process.env.SENDGRID_USER,
                pass: process.env.SENDGRID_PASSWORD
            }
        });
        const mailOptions = {
            to: user.email,
            from: 'hackathon@starter.com',
            subject: 'Reset your password on Hackathon Starter',
            text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://${req.headers.host}/reset/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };
        return transporter.sendMail(mailOptions)
            .then(() => {
                req.flash('info', { msg: `An e-mail has been sent to ${user.email} with further instructions.` });
            })
            .catch((err) => {
                if (err.message === 'self signed certificate in certificate chain') {
                    console.log('WARNING: Self signed certificate in certificate chain. Retrying with the self signed certificate. Use a valid certificate if in production.');
                    transporter = nodemailer.createTransport({
                        service: 'SendGrid',
                        auth: {
                            user: 'j54JohPiQD2C1UX9JFCywA',
                            pass: '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'
                        },
                        tls: {
                            rejectUnauthorized: false
                        }
                    });
                    return transporter.sendMail(mailOptions)
                        .then(() => {
                            req.flash('info', { msg: `An e-mail has been sent to ${user.email} with further instructions.` });
                        });
                }
                console.log('ERROR: Could not send forgot password email after security downgrade.\n', err);
                req.flash('errors', { msg: 'Error sending the password reset message. Please try again shortly.' });
                return err;
            });
    };

    createRandomToken
        .then(setRandomToken)
        .then(sendForgotPasswordEmail)
        .then(() => res.redirect('/forgot'))
        .catch(next);
}

