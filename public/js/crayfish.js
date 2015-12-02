angular.module('crayfish', 
	[
		'ngRoute', 
		'crayfishControllers',
		'crayfishServices'
	]).config(['$routeProvider', function($routeProvider){
		$routeProvider
		.when('/home', {templateUrl: 'home.html', controller: 'HomeCtrl'})
		.when('/blogs', {templateUrl: 'blogList.html', controller: 'BlogListCtrl'})
		.otherwise({redirectTo: '/home'});
}]);