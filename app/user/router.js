var user = require('./controller');

module.exports = function(app){
	app.route('/rawsource/users').get(user.list).post(user.create);
	app.route('/rawsource/users/:userId').get(user.read).put(user.update).delete(user.delete);
	app.param('userId', user.userById);
};