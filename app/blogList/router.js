var blogList = require('./controller');

module.exports = function(app){
	app.route('/rawsource/bloglist').get(blogList.list);
};