var mongoose = require('mongoose');
var User = mongoose.Schema({
    emailId: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    _updated_at: {
        type: Date,
        default: new Date()
    },
    _created_at: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model("User", User);