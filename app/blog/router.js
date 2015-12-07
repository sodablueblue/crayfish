var blog = require('./controller');
var user = require('../user/controller');

module.exports = function(app){
	app.route('/rawresource/bloglist').get(blog.list);
	app.route('/rawresource/blogs').post(user.currentUser, blog.preCreate, blog.create);
	app.route('/rawresource/blogs/:blogId').get(blog.read).put(blog.update).delete(blog.delete);
	app.param('blogId', blog.blogById);
};