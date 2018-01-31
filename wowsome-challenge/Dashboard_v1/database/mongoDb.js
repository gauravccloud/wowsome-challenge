var mongoose = require('mongoose');
var dbConfig = require('../config/dbConfig');
var db = mongoose.connection;
mongoose.connect(dbConfig.mongoConfig.uri, dbConfig.mongoConfig.options, function(err) {
    if (err) {
        console.log('Unable to connect to mongodb.', err);
    } else {
        console.log('Connected to mongo successfully');
    }
});

db.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
});

db.on('connected', function() {
    console.log('MongoDB connected!');
});

db.on('reconnected', function() {
    console.log('MongoDB reconnected!');
});

db.on('disconnected', function() {
    console.log('MongoDB disconnected!');
});