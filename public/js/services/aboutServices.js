angular.module('crayfishServices')
	.factory('About', ['$resource', function($resource){
		return $resource('rawresource/about', {}, {
			query: {method: 'GET', isArray: true}
		});
}]);