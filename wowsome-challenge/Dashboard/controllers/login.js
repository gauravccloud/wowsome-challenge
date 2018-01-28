var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var saltRounds = 10;
var users = require('../models/users');
var _ = require('lodash');

var response_messages = {
    "LOGIN_SUCCESS": {
        "message": "Successfully Login."
    },
    "LOGIN_ERROR": {
        "message": "User doesn't exisit. Please register to continue."
    },
    "LOGIN_WRONGPASSWORD": {
        "message": "Wrong password."
    }
}

exports.login = function(req, res) {
    var emailId = req.body.emailId;
    var password = req.body.password;
    var user = _.find(users.Users, ["emailId", _.toUpper(emailId)]);
    if (!user) {
        res.status(400).send(response_messages.LOGIN_ERROR)
    } else {
        var savedPassword = user.password;
        comparePassword(password, savedPassword, function(response) {
            console.log("Is Correct Passwrd", response);
            if (response) {
                var payload = {
                    "user": user.name
                };

                var respObj = {
                    "name": user.name,
                    "mobileNumber": user.mobileNumber,
                    "emailId": user.emailId,
                    "id": user.id
                }

                var token = generateToken(payload)
                res.status(200).send({
                    "message": response_messages.LOGIN_SUCCESS.message,
                    "status": response_messages.LOGIN_SUCCESS.status,
                    "token": token,
                    "data": respObj
                });
            } else {
                res.status(400).send(response_messages.LOGIN_WRONGPASSWORD);
            }
        })
    }
}

function comparePassword(password, savedPassword, callback) {
    bcrypt.compare(password, savedPassword, function(err, res) {
        if (!err) callback(res)
    });
}

function generateToken(payload) {
    var token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        payload
    }, 'secret');
    return token;
}