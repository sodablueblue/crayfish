'use strict';

angular.module('crayfishControllers').controller('BlogCtrl', ['$scope', 'Blog', function($scope, Blog){
	$scope.blogs = Blog.getBlog();
}]);