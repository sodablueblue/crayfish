var house = require('./controller');

module.exports = function(app){
	app.route('/house').get(house.index);
	app.route('/house/fetch').post(house.displayPriceTrend);
};