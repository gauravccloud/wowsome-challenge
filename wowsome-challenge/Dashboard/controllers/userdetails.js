var users = require('../models/users');
var _ = require('lodash');

exports.getUserDetails = function(req, res) {
    var id = req.body.id;
    var user = _.find(users.Users, ["id", id]);
    if (!user) {
        res.status(400).send({
            "message": "User is not registered"
        })
    } else {
        res.status(200).send({
            "data": user
        })
    }
}