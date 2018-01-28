var bcrypt = require('bcrypt');
var saltRounds = 10;
var users = require('../models/users');
var _ = require('lodash');

var response_messages = {
    "REGISTRATION_SUCCESS": {
        "status": 200,
        "message": "User Registered Successfully."
    },
    "REGISTRATION_ERROR": {
        "status": 400,
        "message": "User already exisits."
    }
}

exports.registerUser = function(req, res) {
    var password = req.body.password;
    var data = {
        "name": _.toUpper(req.body.name),
        "id": generateId(),
        "emailId": _.toUpper(req.body.emailId),
        "mobileNumber": req.body.mobileNumber,
        "password": req.body.password,
        "created_at_": new Date(),
        "updated_at_": new Date()
    };
    var checkEmailId = _.find(users.Users, ["emailId", _.toUpper(req.body.emailId)]);
    if (checkEmailId) {
        res.send(response_messages.REGISTRATION_ERROR);
    } else {
        generateHashedPassword(password, function(hashPassword) {
            data.password = hashPassword;
            users.Users.push(data);
            res.send(response_messages.REGISTRATION_SUCCESS);
        })
    }
}

function generateHashedPassword(password, callback) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            if (!err) callback(hash);
        });
    });
};

function generateId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};