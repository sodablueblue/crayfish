angular.module('crayfish', 
	[
		'ngRoute', 
		'crayfishControllers',
		'crayfishServices'
	]).config(['$routeProvider', function($routeProvider){
		$routeProvider
		.when('/home', {templateUrl: 'home.html', controller: 'HomeCtrl'})
		.when('/bloglist', {templateUrl: 'blogList.html', controller: 'BlogListCtrl'})
		.when('/blogs', {templateUrl: 'blog.html', controller: 'BlogCtrl'})
		.otherwise({redirectTo: '/home'});
}]);