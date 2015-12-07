var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},

	title: {
		type: String,
		trim: true,
		require: 'Title cannot be blank'
	},

	author: {
		type: Schema.ObjectId,
		ref: 'User'
	},

	comment: {
		type: String,
		trim: true
	},

	img: {
		type: String,
		require: 'img cannot be blank',
		trim: true
	}
});

mongoose.model('Post', PostSchema);