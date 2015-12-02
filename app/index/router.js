var index = require('./controller');

module.exports = function(app){
	app.route('/').get(index.index);
};