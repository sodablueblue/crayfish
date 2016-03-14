var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommunitySchema = new Schema({
	name: String,
	count: Number
});

module.exports = mongoose.model('Community', CommunitySchema);