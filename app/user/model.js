var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: {
		type: String,
		trim: true,
		unique: true,
		required: 'Username is required'
	},

	password: {
		type: String,
		minlength: 6,
		required: true
	},

	created: {
		type: Date,
		default: Date.now
	},

	nickname: {
		type: String,
		trim: true,
		unique: true,
		required: 'Nickname is required'
	}
});

mongoose.model('User', UserSchema);