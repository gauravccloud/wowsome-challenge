var jwt = require('jsonwebtoken');

function generateToken(payload) {
    var token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        payload
    }, 'secret');
    return token;
}

function generateId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};

module.exports = {
    "generateToken": generateToken,
    "generateId": generateId
}