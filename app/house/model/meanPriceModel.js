var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MeanPriceSchema = new Schema({
	created: {
		type: String,
	},

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

	meanPrice: {
		type: String,
		trim: true,
		require: true
	}
});

module.exports = mongoose.model('MeanPrice', MeanPriceSchema);