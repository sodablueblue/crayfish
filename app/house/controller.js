var lianjia = require('./agent/lianjia.js');
var HousePrice = require('./model/housePriceModel.js');
var MeanPrice = require('./model/meanPriceModel.js');

function saveHousePrice(house, agent, community){
	var housePrice = new HousePrice();
	housePrice.community = community;
	housePrice.fangxing = house.fangxing;
	housePrice.agent = agent;
	housePrice.price = house.price;
	housePrice.prePrice = house.prePrice;
	housePrice.birth = house.birth;
	housePrice.created = new Date().getTime()/1000;

	housePrice.save(function(err){
		if(err) return console.log(err);
		return console.log('Save House price!');
	})
}

function saveMeanPrice(mean){
	var meanPrice = new MeanPrice();
	meanPrice.agent = mean.agent;
	meanPrice.community = mean.community;
	var date = new Date();
	meanPrice.created = new Date().getTime()/1000;
	meanPrice.meanPrice = mean.meanPrice;

	meanPrice.save(function(err){
		if(err) return console.log(err);
		return console.log('Save mean price!');
	});
}

function savePrice(bunch){
	saveMeanPrice(bunch);
	bunch.houses.forEach(function(item, index){
		saveHousePrice(item, bunch.agent, bunch.community);
	});
}

exports.index = function(req, res){
	res.render('house.html');
};

exports.fetchPrice = function(search){
	lianjia.fetchPricePre(search, savePrice);
};

exports.displayPriceTrend = function(req, res, next){
	var search = encodeURIComponent(req.body.xiaoqu);
	MeanPrice.find({ 'community': search }, '-_id -__v', function(err, data){
		res.json(data);
	});
};
