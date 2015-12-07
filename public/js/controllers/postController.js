'use strict';

angular.module('crayfishControllers')
	.controller('PostCtrl', ['$scope', 'Post', function($scope, Post){
		Post.query({}, function(posts){
			$scope.posts = posts;
		});

		$scope.showImg = false;
}]);