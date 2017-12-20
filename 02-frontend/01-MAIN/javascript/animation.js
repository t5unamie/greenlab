var animateApp = angular.module('animateApp', ['ngRoute', 'ngAnimate']);

animateApp.config(function($routeProvider) {
    $routeProvider
    	.when('/', {
    		templateUrl: 'index.html'
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