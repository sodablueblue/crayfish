var blogList = require('../blogList/controller.js');
var blog = require('./controller.js');

module.exports = function(app){
	app.route('/rawsource/blogs').post(blogList.create, blog.create);

	app.param('blogId', blog.blogById);

	app.route('/rawsource/blogs/:blogId')
		.get(blog.read)
		.put(blog.hasAuthorization, blog.update)
		.delete(blog.hasAuthorization, blog.delete);
};