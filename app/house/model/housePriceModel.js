var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HousePriceSchema = new Schema({
	created: {
		type: String,
	},

	birth: String,

	agent: {
		type: String,
		trim: true,
		require: 'Agent cannot be blank'
	},

	community: {
		type: String,
		trim: true,
		require: true
	},

	price: {
		type: String,
		trim: true,
		require: true
	},

	fangxing: {
		type: String,
		trim: true,
		require: true
	},

	prePrice: {
		type: String,
		trim: true,
		require: true
	}
});

module.exports = mongoose.model('HousePrice', HousePriceSchema);