var bcrypt = require('bcrypt');
var saltRounds = 10;
var User = require('../models/users');
var _ = require('lodash');
var response_messages = require('../helpers/error');
var session = require('../helpers/session');

exports.registerUser = function(req, res) {
    var password = req.body.password;
    var data = {
        "name": _.toUpper(req.body.name),
        "emailId": _.toUpper(req.body.emailId),
        "mobileNumber": req.body.mobileNumber,
        "password": req.body.password,
        "created_at_": new Date(),
        "updated_at_": new Date()
    };
    console.log("Data", data);

    generateHashedPassword(password, function(hashPassword) {
        data.password = hashPassword;
        var userSchema = new User(data);
        userSchema.save(data, function(err, doc) {
            if (err) {
                if (err.code === 11000) {
                    res.status(400).send(response_messages.REGISTRATION_ERROR);
                } else if (err.ValidationError) {
                    res.status(400).send(response_messages.REGISTRATION_VALIDATION_ERROR);
                } else {
                    res.status(400).send(response_messages.REGISTRATION_ERROR);
                }
            } else {
                res.status(200).send(response_messages.REGISTRATION_SUCCESS);
            }
        })
    })
}

function generateHashedPassword(password, callback) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            if (!err) callback(hash);
        });
    });
};