var lianjia = require('../agent/lianjia.js');

lianjia.fetchPricePre('由由六村', console.log);
setTimeout(function(){
	lianjia.fetchPricePre('由由六村', console.log);
	setTimeout(function(){
		lianjia.fetchPricePre('由由六村', console.log);
	}, 10 * 1000);
}, 10 * 1000);