var Blog = require('mongoose').model('Blog');

exports.preCreate = function(req, res, next){
	var content = req.body.content;
	var blog = {outline: '', content: '', title: '', author: ''};
	blog.outline = content.length > 100 ? content.substr(0, 100) : content;
	blog.content = content;
	blog.title = req.body.title;

	// TODO: Implement author;
	blog.author = req.user;

	req.blog = blog;
	next();
}

exports.create = function(req, res){
	var blog = new Blog(req.blog);

	blog.save(function(err, blog){
		if(err){
			return res.status(400).send({
				message: 'Cannot create blog list.'
			});
		}else{
			res.json(blog);
		}
	});
};

exports.list = function(req, res){
	Blog.find({}, '-content').populate('author', 'nickname').exec(function(err, Blog){
		if(err){
			return res.status(400).send({
				message: 'Cannot list blog list'
			});
		}else{
			res.json(Blog);
		}
	});
};

exports.hasAuthorization = function(req, res, next){
	// TODO: Initial authorization for Blog List
	next();
}

exports.blogById = function(req, res, next, id){
	Blog.findById(id).populate('user', 'nickname').exec(function(err, blog){
		if(err) next(err);
		if(!blog) next(new Error('Fail to load BlogList ' + id));
		
		req.blog = blog;
		next();
	});
};

exports.read = function(req, res){
	res.json(req.blog);
}

exports.update = function(req, res, next){
	var blog = req.blog;

	blog.title = req.body.title;
	blog.content = req.body.content;
	blog.created = Date.now;

	blog.save(function(err){
		if(err){
			return res.status(400).send({
				message: 'Cannot update blog list'
			});
		}else{
			res.json(blog);
		}
	});
};

exports.delete = function(req, res, next){
	var blog = req.blog

	blog.remove(function(err){
		if(err){
			return res.status(400).send({
				message: 'Cannot delete blog list'
			});
		}else{
			res.end('Delete success!');
		}
	});
};