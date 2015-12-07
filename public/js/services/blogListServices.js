angular.module('crayfishServices')
	.factory('BlogList', ['$resource', function($resource){
			return $resource('rawresource/bloglist', {}, {
				query: {method: 'GET', isArray: true}
			});
}]);