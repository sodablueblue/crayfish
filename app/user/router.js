var user = require('./controller');

module.exports = function(app){
	app.route('/rawresource/users').get(user.list).post(user.create);
	app.route('/rawresource/users/:userId').get(user.read).put(user.update).delete(user.delete);
	app.param('userId', user.userById);
};