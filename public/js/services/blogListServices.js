angular.module('crayfishServices')
	.factory('BlogList', ['$resource', function($resource){
			return $resource('rawsource/bloglist', {}, {
				query: {method: 'GET', isArray: true}
			});
}]);