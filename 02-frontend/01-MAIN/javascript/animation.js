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

/*    // Defining angularjs application.
    var postApp = angular.module('postApp', []);
    // Controller function and passing $http service and $scope var.
    postApp.controller('postController', function($scope, $http, $window) {
      // create a blank object to handle form data.
        $scope.user = {};
        $scope.token = localStorage.getItem("Token");
      // calling our submit function.
        $scope.submitForm = function() {
        // Posting data to php file
        $http({
          method  : 'POST',
          url     : 'http://localhost:3001/api/authenticate',
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
            }
          });
        };
    });
    postApp.controller('NonSecureController', function ($scope, $http) {
        $http({
          method  : 'GET',
          url     : 'http://localhost:3002/scrape',
          headers : {'Content-Type': 'application/json'} 
         })
          .success(function(data) {
            if (data.errors) {
              // Showing errors.
              $scope.errorName = data.errors.name;
              $scope.errorPassword = data.errors.password;
            } else {
              $scope.MovieTitle = data.title
              $scope.released = data.release
              $scope.rating = data.rating
            }
          });
    });
    postApp.controller('SecureController', function ($scope, $http) {
        
        $scope.token = localStorage.getItem("Token");
        if (typeof $scope.token !== 'undefined') {
          $http({
            method  : 'POST',
            url     : 'http://localhost:3003/names',
            data : { "token": $scope.token }
          })
          .success(function(data) {
            if (data.errors) {
              // Showing errors.
              $scope.errorName = data.errors.name;
            } else {
              $scope.firstName = data.firstName
              $scope.lastName = data.lastName
            }
          });
        }
    });
*/