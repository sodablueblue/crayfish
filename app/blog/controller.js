var Blog = require('mongoose').model('Blog');

exports.create = function(req, res){
	var blog = new Blog(req.body);
	blog.outline = req.outline;

	blog.save(function(err){
		if(err){
			return res.status(400).send({
				message: 'Cannot creat blog'
			});
		}else{
			res.json(blog);
		}
	});
};

exports.blogById = function(req, res, next, id){
	Blog.findById(id).populate('outline', 'created title author').exec(function(err, blog){
		if(err) return next(err);
		if(!blog) return next(new Error('Fail to load blog ' + id));

		req.blog = blog;
		next();
	});
};

exports.read = function(req, res){
	res.json(req.blog);
};

exports.update = function(req, res){
	var blog = req.blog;

	blog.content = req.body.content;

	blog.save(function(err){
		if(err){
			return res.status(400).send({
				message: 'Cannot update blog'
			});
		}else{
			res.json(blog);
		}
	});
};

exports.delete = function(req, res, next){
	var blog = req.blog;

	article.remove(function(err){
		if(err){
			return res.status(400).send({
				message: 'Cannot delete blog'
			});
		}else{
			res.end();
		}
	})
}

exports.hasAuthorization = function(req, res, next){
	// TODO: Init authorization of blog

	next();
}