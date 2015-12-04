'use strict';

angular.module('crayfishControllers').controller('BlogCtrl', ['$scope', 'Blog', function($scope, Blog){
	$scope.blog = Blog.getBlog();
}]);