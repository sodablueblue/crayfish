var BlogList = require('mongoose').model('BlogList');

exports.create = function(req, res){
	var blogList = new BlogList(req.body);
	blogList.creator = req.user;

	blogList.save(function(err){
		if(err){
			return res.status(400).send({
				message: 'Cannot create blog list.'
			});
		}else{
			res.json(blogList);
		}
	});
};

exports.list = function(req, res){
	BlogList.find().sort('-created').populate('author', 'name').exec(function(err, blogList){
		if(err){
			return res.status(400).send({
				message: 'Cannot list blog list'
			});
		}else{
			res.json(blogList);
		}
	});
};

exports.hasAuthorization = function(req, res, next){
	// TODO: Initial authorization for Blog List
	next();
}

exports.blogListById = function(req, res, next, id){
	BlogList.findById(id).populate('author', 'name').exec(function(err, blogList){
		if(err) return next(err);
		if(!blogList) return next(new Error('Fail to load BlogList ' + id));

		req.blogList = blogList;
		next();
	});
};

exports.update = function(req, res){
	var blogList = req.blogList;

	blogList.title = req.body.title;
	blogList.content = req.body.content;
	blogList.created = Date.now;

	blogList.save(function(err){
		if(err){
			return res.status(400).send({
				message: 'Cannot update blog list'
			});
		}else{
			res.json(blogList);
		}
	});
};

exports.delete = function(req, res){
	var blogList = req.blogList;

	blogList.remove(function(err){
		if(err){
			return res.status(400).send({
				message: 'Cannot delete blog list'
			});
		}else{
			res.end();
		}
	});
};