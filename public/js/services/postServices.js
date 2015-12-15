angular.module('crayfishServices').factory('Post', ['$resource', function($resource){
	return $resource('rawresource/posts', {}, {
		query: {method: 'GET', isArray: true}
	});

}]);