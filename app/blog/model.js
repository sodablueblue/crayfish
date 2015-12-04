// var fs = require('fs');
// var evnt = require('./event');

// exports.getOutline = function(){
// 	fs.readFile('demo/outline.json', 'utf-8', function(err, outline){
// 		if(err) throw err;
// 		else {
// 			evnt.emitter.emit(evnt.GET_OUTLINE, JSON.parse(outline));
// 		}
// 	});
// }

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},

	title: {
		type: String,
		default: 'Title',
		trim: true,
		required: 'Title cannot be blank'
	},

	author: {
		type: Schema.ObjectId,
		ref: 'User'
	},

	content: {
		type: String,
		default: '',
		trim: true
	},

	outline: {
		type: String,
		default: '',
		trim: true,
		maxlength: 50
	}
});

mongoose.model('Blog', BlogSchema);