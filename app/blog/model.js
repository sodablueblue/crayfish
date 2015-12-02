var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
	content: {
		type: String,
		default: '',
		trim: true
	},

	outline: {
		type: Schema.ObjectId,
		ref: 'BlogList'
	}
});

mongoose.model('Blog', BlogSchema);