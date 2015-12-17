var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('User');

module.exports = function(){
	passport.use(new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password'
		},
		function(email, password, done){
			
		User.findOne({
			username: email
		}, function(err, user){
			if(err){
				return done(err);
			}

			if(!user){
				return done(null, false, {message: 'Unknow user'});
			}

			if(!user.authenticate(password)){
				return done(null, false, {message: 'Invalid password'});
			}
			return done(null, user);
		});
	}));
};