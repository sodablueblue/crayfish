var request = require('request');
var cheerio = require('cheerio');
var q = require('q');
var defer = q.defer();

function getPre(search, cb, reject){
	var url = 'http://sh.lianjia.com/ershoufang/rs';

	var options = {
		'url': url,
		'content-type': 'application/json; charset=utf-8'
	};

	var cbPre = function(err, response, body){
		if(err) return defer.reject('ERR: ' + err);
		var $ = cheerio.load(body);
		$('div.info-panel').each(function(i, elem){
			var col1 = $(this).children('div.col-1');
			var house = function(){
				var house = {
					community: '',
					fangxing: '',
					area: '',
					birth: '',
					price: '',
					prePrice: ''
				};
				var item = col1.children('.where');
				var comm = encodeURIComponent(item.children('.laisuzhou').children().html().toString());

				var convertedComm = unescape(comm).replace(/;?&#x/ig,'%u');
				if(escape(search) != convertedComm.substring(0, convertedComm.length -1)){
					console.log('not equal');
					defer.reject('Cannot fetch ' + search);
				}

				house.community = comm;
				
				var spans = item.children('span');
				house.fangxing = spans.first().children().html().toString();
				house.area = spans.first().next().html().toString();
				var arr = item.siblings('.other').children().html().toString().split('>');
				house.birth = arr[arr.length - 1];

				var col3 = col1.siblings('.col-3');
				house.price = Number(col3.children('.price').children('.num').html().toString()) * 10000;
				house.prePrice = Number(col3.children('.price-pre').html().toString().split(' ')[0]);
				return house
			}();
			output.meanPrice = Math.round((output.meanPrice * (i == 0 ? 1 : i) + house.prePrice) / (i + 1));
			output.houses.push(house);
		});

		defer.resolve(output);
	};

	var output = {
		agent: 'lianjia',
		meanPrice: 0,
		community: '',
		houses:[]
	};

	output.community = encodeURIComponent(search.trim());
	options.url += encodeURIComponent(search.trim());
	console.log('request', options.url);
	request(options, cbPre);
	defer.promise.then(cb, reject);
};

exports.fetchPricePre = getPre;