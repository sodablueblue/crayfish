var User = require('mongoose').model('User');

exports.create = function(req, res, next){
	var user = new User(req.body);

	user.save(function(err){
		if(err){
			return res.status(400).send({message: 'Cannot create user'});
		}else{
			res.json(user);
		}
	});
};

exports.list = function(req, res, next){
	User.find({}, function(err, users){
		if(err){
			return res.status(400).send({message: 'Cannot list user'});
		}else{
			res.json(users);
		}
	});
};

exports.userById = function(req, res, next, id){
	User.findOne({_id: id}, function(err, user){
		if(err){
			return res.status(400).send({message: 'Cannot index user'});
		}else{
			req.user = user;
			next();
		}
	});
};

exports.read = function(req, res, next){
	res.json(req.user);
};

exports.update = function(req, res, next){
	User.findByIdAndUpdate(req.user.id, req.body, function(err, user){
		if(err){
			return res.status(400).send({message: 'Cannot update user'});
		}else{
			res.json(req.user);
		}
	});
};

exports.delete = function(req, res, next){
	req.user.remove(function(err){
		if(err){
			return res.status(400).send({message: 'Cannot delete user'});
		}else{
			res.json(req,user);
		}
	});
};

exports.currentUser = function(req, res, next){
	req.user = User.findOne({ }, function(err, user){
		if(err){
			return res.status(400).send({message: 'Cannot get current user'});
		}else{
			req.user = user;
			next();
		}
	});
};

exports.logout = function(req, res){
	req.logout();
	res.redirect('');
};

exports.requireLogin = function(req, res, next){
	if(!req.isAuthenticated()){
		return res.status(400).send({
			message: 'User is not logged in'
		});
	}

	next();
};
