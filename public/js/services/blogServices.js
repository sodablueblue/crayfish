angular.module('crayfishServices').factory('Blog', ['$resource', function($resource){
	var _blogs = [];

	var _fetchBlog = $resource('rawsource/blogs/:id', {id: '@_id'},
			{query: {method: 'GET'}}); 
	
	var setBlog = function(id){
		_fetchBlog.query({id: id}, function(blog){
			_blogs[0] = blog;
		});
	};

	var getBlog = function(){
		return _blogs;
	};

	return {
		setBlog: setBlog,
		getBlog: getBlog
	};

}]);