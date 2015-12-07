angular.module('crayfishControllers').controller('AboutCtrl', ['$scope', 'About', function($scope, About){
	About.query({}, function(abouts){
		$scope.abouts = abouts; });
}]);