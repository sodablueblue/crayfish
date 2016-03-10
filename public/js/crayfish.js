angular.module('crayfish', 
	[
		'ngRoute', 
		'crayfishControllers',
		'crayfishServices'
	]).config(['$routeProvider', function($routeProvider){
		$routeProvider
		.when('/home', {templateUrl: 'post.html', controller: 'PostCtrl'})
		.when('/houseSearch', {templateUrl: 'houseSearch.html', controller: 'HouseSearchCtrl'})
		.when('/bloglist', {templateUrl: 'blogList.html', controller: 'BlogListCtrl'})
		.when('/blogs', {templateUrl: 'blog.html', controller: 'BlogCtrl'})
		.when('/about', {templateUrl: 'about.html', controller: 'AboutCtrl'})
		.when('/login', {templateUrl: 'login.html', controller: 'LoginCtrl'})
		.otherwise({redirectTo: '/home'});
}]);