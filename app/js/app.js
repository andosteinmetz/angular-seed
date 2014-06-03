'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'ngSanitize',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).

config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/shows', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
  $routeProvider.when('/show/:showId', {templateUrl: 'partials/single.html', controller: 'ShowDetailCtrl'});
  $routeProvider.otherwise({redirectTo: '/shows'});
}]);
