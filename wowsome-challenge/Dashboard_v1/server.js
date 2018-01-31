var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var ejs = require('ejs');
var mongoose = require('mongoose');
var mongodb = require('./database/mongoDb');

var routes = require('./routes/index');
var app = express();

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

//Configutation
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', (__dirname + '/client'));
app.use(express.static(__dirname + '/client'));

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes.router);

var port = "8085" || process.env.PORT;
var server = app.listen(port, function() {
    console.log("Server running at port ", port)
});

module.exports = server;