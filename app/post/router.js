var post = require('./controller');
var user = require('../user/controller');

module.exports = function(app){
	app.route('/rawresource/posts').get(post.list).post(user.currentUser, post.create);
	app.route('/rawresource/posts/:postId').put(post.update).delete(post.delete);
	app.param('postId', post.postById);
};