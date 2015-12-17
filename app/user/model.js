var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

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
	},

	salt: {
		type: String
	},

	provider: {
		type: String
		// required: 'Provider is required'
	},

	providerId: String,

	providerDate: {}
});

UserSchema.pre('save', function(next){
	if(this.password){
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

UserSchema.methods.hashPassword = function(password){
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

UserSchema.methods.authenticate = function(password){
	return this.password === this.hashPassword(password);
};

UserSchema.statics.findUniqueUsername = function(username, suffix, callback){
	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne({
		username: possibleUsername
	}, function(err, user){
		if(!err){
			if(!user){
				callback(possibleUsername);
			}else{
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		}else{
			callback(null);
		}
	});
};

mongoose.model('User', UserSchema);