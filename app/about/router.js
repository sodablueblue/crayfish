var about = require('./controller');
var user = require('../user/controller');


module.exports = function(app){
	app.route('/rawresource/about').get(about.list).post(user.currentUser, about.create);
	app.route('/rawresource/about/:aboutId').put(about.update).delete(about.delete);
	app.param('aboutId', about.aboutById);
};