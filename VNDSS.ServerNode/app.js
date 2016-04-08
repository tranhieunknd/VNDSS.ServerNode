var express = require('express');
//var routes = require('./routes');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var connection = require('express-myconnection');
var gcm = require('node-gcm');

var app = express();

// all environments
app.set('port', 4300 || process.env.PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(bodyParser.json());
app.use(skipper());

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});