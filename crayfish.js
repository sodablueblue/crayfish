process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/db.js');
var express = require('./config/express');
var passport = require('./config/passport');
var house = require('./app/house/controller');

var db = mongoose();
var app = express(db);
var passport = passport();

app.listen(7777);
console.log('Crayfish on http://localhost:7777');

// Fetch price per 12 hours
house.fetchPrice(3600 * 12);