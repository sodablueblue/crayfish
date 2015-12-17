angular.module('crayfishServices').factory('Login', ['$resource', function($resource){
	return $resource('rawresource/signin', {}, {
		submit: {method: 'POST'}
	});
}]);