var animateApp = angular.module('animateApp', ['ngRoute', 'ngAnimate']);

animateApp.config(function($routeProvider) {
    $routeProvider
    	.when('/', {
    		templateUrl: 'templates/home.html'
    	})
    	.when('/signin', {
    		templateUrl: 'templates/signin.html'
    	})
    	.when('/register', {
    		templateUrl: 'templates/register.html'
    	})
      .when('/aboutus', {
        templateUrl: 'templates/aboutus.html'
      });

});

// This sets up login authentications.
// Controller function and passing $http service and $scope var.
animateApp.controller('postController', function($scope, $http, $window) {
  // create a blank object to handle form data.
    $scope.user = {};
    $scope.token = localStorage.getItem("Token");
  // calling our submit function.
    $scope.submitForm = function() {
    // Posting data to php file
    $http({
      method  : 'POST',
      url     : 'http://localhost:3001/api/auth/v1/authenticate',
      data    : $scope.user, //forms user object
      headers : {'Content-Type': 'application/json'} 
     })
      .success(function(data) {
        console.log($window)
        if (data.errors) {
          // Showing errors.
          $scope.errorName = data.errors.name;
          $scope.errorPassword = data.errors.password;
        } else {
          //SAVE localstorage  VAUE example
          localStorage.setItem("Token", data.token);
          //SAVE localstorage  VAUE example
          $scope.token = localStorage.getItem("Token");
          //SAVE Session VAUE example
          $window.sessionStorage.setItem("Token", data.token );
          //SHOW session VAUE example
          $scope.token2 = $window.sessionStorage.getItem("Token");
         window.location.href = "/";
        }
      });
    };
});

//logout funtion

function doLogout() {
  localStorage.removeItem('Token');
}

// Setup variables for use by pages for defasult site.
animateApp.controller('aboutus', function($scope) {
    $scope.page = 'About Us';
});

animateApp.controller('home', function($scope) {
    $scope.page = 'Home';
});

animateApp.controller('register', function($scope) {
    $scope.page = 'Register';
});

animateApp.controller('signin', function($scope) {
    $scope.page = 'Sign In';
});

animateApp.controller('toolbarControler', function ($scope, $http) {
    $scope.token = localStorage.getItem("Token");
});