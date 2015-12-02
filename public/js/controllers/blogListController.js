'use strict';

angular.module('crayfishControllers')
	.controller('BlogListCtrl', ['$scope', 'BlogList', function($scope, BlogList){
		$scope.blogs = BlogList.query({}, function(list){

		});
}]);