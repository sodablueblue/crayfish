var mongoose = require('mongoose');
var config = require('./config');

module.exports = function(){
	var db = mongoose.connect(config.db);

	require('../app/blog/model');
	require('../app/user/model');
	require('../app/about/model');
	require('../app/post/model');
	require('../app/house/model/housePriceModel');
	require('../app/house/model/meanPriceModel');
	return db;
}