var Post = require('mongoose').model('Post');

exports.create = function(req, res){
	var post = new Post();
	post.img = req.body.img;
	post.comment = req.body.comment;
	post.title = req.body.title;
	post.author = req.user;
	post.save(function(err, post){
		if(err){
			return res.status(400).send({
				message: 'Cannot create post.'
			});
		}else{
			res.json(post);
		}
	});
};

exports.list = function(req, res){
	Post.find({}, '-_id -__v').populate('author', 'nickname').exec(function(err, post){
		if(err){
			return res.status(400).send({
				message: 'Cannot list post'
			});
		}else{
			res.json(post);
		}
	});
};

exports.postById = function(req, res, next, id){
	Post.findById(id).populate('user', 'nickname').exec(function(err, post){
		if(err) next(err);
		if(!post) next(new Error('Fail to load post ' + id));

		req.post = post;
		next();
	});
};

exports.read = function(req, res){
	res.json(req.post);
};

exports.update = function(req, res, next){
	var post = req.post;

	post.title = req.body.title;
	post.created = Date.now;
	post.img = req.body.img;
	post.comment = req.body.comment;

	post.save(function(err){
		if(err){
			return res.status(400).send({
				message: 'Cannot update post'
			});
		}else{
			res.json(post);
		}
	});
};

exports.delete = function(req, res, next){
	var post = req.post;

	post.remove(function(err){
		if(err){
			return res.status(400).send({
				message: 'Cannot delete post'
			});
		}else{
			res.end('Delete success!');
		}
	});
};