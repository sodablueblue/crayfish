'use strict';

angular.module('crayfishControllers')
	.controller('BlogListCtrl', ['$scope', 'BlogList', 'Blog', '$location', function($scope, BlogList, Blog, $location){
		$scope.blogs =BlogList.query({}, function(list){ });
		$scope.getBlogDetail = function(id){
			Blog.setBlog(id);
			$location.path('/blogs');
		}
}]);