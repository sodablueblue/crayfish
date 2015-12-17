angular.module('crayfishControllers').controller('LoginCtrl', ['$scope', 'Login', '$location', function($scope, Login, $location){

	var emailReady = false;
	var passwdReady = false;

	var email = '';
	var passwd = '';

	$scope.formReady = false;

	$scope.checkEmail = function(){
		var reg1 = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-z]{2,6}$/i;

		email = $('#email').val();
		if(email.length == 0){
			emailReady = false;
			return;
		}

		if(!reg1.test(email)){
			emailReady = false;
			$scope.email = '';
			return;
		}
		
		emailReady = true;

		$scope.formReady = emailReady && passwdReady;
	};

	$scope.checkPasswd = function(){
		passwd = $('#passwd').val();

		if(passwd.length < 5){
			passwdReady = false;
			return ;
		}

		passwdReady = true;

		$scope.formReady = emailReady && passwdReady;
	};

	$scope.submit = function(){
		if($scope.formReady){
			Login.submit({}, {'email': email, 'password': passwd}, 
				function(response){
					$location.path('/');
				}, 
				function(response){
					$scope.email = '';
					$scope.passwd = '';
					$location.path('/login');
				}
			);
		}
	};
}]);