var user = require('./controller');
var passport = require('passport');

module.exports = function(app){
	app.route('/rawresource/users').get(user.list).post(user.create);
	app.route('/rawresource/users/:userId').get(user.read).put(user.update).delete(user.delete);
	app.param('userId', user.userById);
	app.get('/rawresource/signout', user.logout);
	app.route('/rawresource/signin').post(passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/rawresource/signin',
		failureFlash: true
	}));
};