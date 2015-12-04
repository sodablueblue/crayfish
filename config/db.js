var mongoose = require('mongoose');
var config = require('./config');

module.exports = function(){
	var db = mongoose.connect(config.db);

	require('../app/blog/model');
	require('../app/user/model');
	
	return db;
}