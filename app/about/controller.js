var About = require('mongoose').model('About');

exports.create = function(req, res){
	var about = new About(req.body);

	about.user = req.user;
	about.save(function(err, about){
		if(err){
			return res.status(400).send({
				message: 'Cannot create about'
			});
		}else{
			res.json(about);
		}
	});
};

exports.list = function(req, res){
	About.find({}, '-_id -__v').populate('author').exec(function(err, about){
		if(err){
			return res.status(400).send({
				message: 'Cannot list about'
			});
		}else{
			res.json(about);
		}
	});
};

exports.aboutById = function(req, res, next, id){
	About.findById(id, function(err, about){
		if(err) next(err);
		if(!about) next(new Error('Cannot index about ' + id));

		req.about = about;
		next();
	});
};

exports.update = function(req, res, next){
	var about = req.about;

	about.comment = req.body.comment;
	about.save(function(err){
		if(err){
			return res.status(400).send({
				message: 'Cannot update about'
			});
		}else{
			res.json(about);
		}
	});
};

exports.delete = function(req, res, next){
	var about = req.about;

	about.remove(function(err){
		if(err){
			return res.status(400).send({
				message: 'Cannot delete about list'
			});
		}else{
			res.end('Delete success');
		}
	});
};
