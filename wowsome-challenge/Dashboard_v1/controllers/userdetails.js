var User = require('../models/users');
var _ = require('lodash');

exports.getUserDetails = function(req, res) {
    var id = req.body.id;
    User.find({ "_id": id }).lean().exec(function(err, doc) {
        var user = (doc && doc[0]) ? doc[0] : {};
        if (!user) {
            res.status(400).send({
                "message": "User is not registered"
            })
        } else {
            res.status(200).send({
                "data": user
            })
        }
    })
}