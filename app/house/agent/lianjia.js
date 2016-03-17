var request = require('request');
var cheerio = require('cheerio');

function getPre(search, cb, reject){
	var url = 'http://sh.lianjia.com/ershoufang/rs';

	var options = {
		'url': url,
		'content-type': 'application/json; charset=utf-8'
	};

	var output = {
		agent: 'lianjia',
		meanPrice: 0,
		community: '',
		houses:[]
	};

	var cbPre = function(err, response, body){
		if(err) return reject('ERR: ' + err);
		var $ = cheerio.load(body);
		$('div.info-panel').each(function(i, elem){
			var col1 = $(this).children('div.col-1');
			var house = function(){
				var houseItem = {
					community: '',
					fangxing: '',
					area: '',
					birth: '',
					price: '',
					prePrice: ''
				};
				var item = col1.children('.where');
				var comm = item.children('.laisuzhou').children().html().toString();

				houseItem.community = encodeURIComponent(comm);
				
				var spans = item.children('span');
				houseItem.fangxing = spans.first().children().html().toString().trim();
				houseItem.area = spans.first().next().html().toString().trim().split('&')[0];
				var arr = item.siblings('.other').children().html().toString().split('>');
				houseItem.birth = arr[arr.length - 1].toString().trim().split('&')[0];

				var col3 = col1.siblings('.col-3');
				houseItem.price = Number(col3.children('.price').children('.num').html().toString()) * 10000;
				houseItem.prePrice = Number(col3.children('.price-pre').html().split('&')[0]);
				return houseItem
			}();
			output.meanPrice = Math.round((output.meanPrice * (i == 0 ? 1 : i) + house.prePrice) / (i + 1));
			output.houses.push(house);
		});
		cb(output);
	};

	output.community = encodeURIComponent(search.trim());
	options.url += encodeURIComponent(search.trim());
//	console.log('request', options.url);
	request(options, cbPre);
};

exports.fetchPricePre = getPre;