var blog = require('./controller');
var user = require('../user/controller');

module.exports = function(app){
	app.route('/rawsource/bloglist').get(blog.list);
	app.route('/rawsource/blogs').post(user.currentUser, blog.preCreate, blog.create);
	app.route('/rawsource/blogs/:blogId').get(blog.read).put(blog.update).delete(blog.delete);
	app.param('blogId', blog.blogById);
};