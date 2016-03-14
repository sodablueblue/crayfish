var lianjia = require('./agent/lianjia.js');
var HousePrice = require('./model/housePriceModel.js');
var MeanPrice = require('./model/meanPriceModel.js');
var Community = require('./model/communityModel.js');

function saveHousePrice(house, agent, community){
	var housePrice = new HousePrice();
	housePrice.community = community;
	housePrice.fangxing = house.fangxing;
	housePrice.agent = agent;
	housePrice.price = house.price;
	housePrice.prePrice = house.prePrice;
	housePrice.birth = house.birth;
	housePrice.created = Math.round(new Date().getTime()/1000);
	housePrice.save(function(err){
		if(err) return console.log(err);
		//return console.log('Save House price!');
	})
}

function saveMeanPrice(mean){
	var meanPrice = new MeanPrice();
	meanPrice.agent = mean.agent;
	meanPrice.community = mean.community;
	var date = new Date();
	meanPrice.created = Math.round(new Date().getTime()/1000);
	meanPrice.meanPrice = mean.meanPrice;
	meanPrice.save(function(err){
		if(err) return console.log(err);
		//return console.log('Save mean price!');
	});
}

function savePrice(bunch){
	saveMeanPrice(bunch);
	bunch.houses.forEach(function(item, index){
		saveHousePrice(item, bunch.agent, bunch.community);
	});
}

function recordCommunity(community, cb){
	Community.find({'name' : community}, '-_id -__v', function(err, data){
		if(data.length > 0){
			data.count += 1;
			new Community(data).save(function(){
				cb();
			});
		}else{
			new Community({
				name: community,
				count: 1
			}).save(function(){
				cb();
			});
		}
	})
}

exports.index = function(req, res){
	res.render('house.html');
};

exports.fetchPrice = function(second){
	var ms = second * 1000;
	var routine = function(){
		Community.find({}, '', function(err, data){
			data.forEach(function(item, index){
				console.log('fetch price', decodeURIComponent(item.name));
				lianjia.fetchPricePre(decodeURIComponent(item.name), savePrice, console.log);
			});
		});
	};
	routine();
	setInterval(routine, ms);
};

exports.displayPriceTrend = function(req, res, next){
	var search = encodeURIComponent(req.body.xiaoqu.trim());
	if(search.length == 0) {
		return res.json({'error': 'can be null'});
	}
	recordCommunity(search, function(){
		MeanPrice.find({ 'community': search }, '-_id -__v', function(err, data){
			res.json(data);
		});
	});
};
