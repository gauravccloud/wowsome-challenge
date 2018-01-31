var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var saltRounds = 10;
var User = require('../models/users');
var _ = require('lodash');
var response_messages = require('../helpers/error');
var session = require('../helpers/session');


exports.login = function(req, res) {
    var emailId = _.toUpper(req.body.emailId);
    var password = req.body.password;
    User.find({ "emailId": emailId }).exec(function(err, doc) {
        if (err) {
            res.status(400).send(response_messages.LOGIN_ERROR)
        } else {
            console.log("Docs", doc);
            var savedPassword = (doc && doc[0]) ? doc[0].password : '';
            var user = (doc && doc[0]) ? doc[0] : null;
            console.log(user)
            if (user) {
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
                            "id": user._id
                        }

                        var token = session.generateToken(payload)
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
            } else {
                res.status(400).send(response_messages.NOT_REGISTERED);
            }
        }
    })
}

function comparePassword(password, savedPassword, callback) {
    bcrypt.compare(password, savedPassword, function(err, res) {
        if (!err) callback(res)
    });
};
null