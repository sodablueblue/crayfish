var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AboutSchema = new Schema({
	comment: {
		type: String,
		trim: true,
		required: true
	},

	author: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('About', AboutSchema);