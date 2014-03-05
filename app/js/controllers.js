'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', ['$scope', '$http', function($scope, $http) {
        $scope.today = new Date();
        $http.get('shows/shows.json').success(function(data){
            $scope.shows = data;
            $scope.pastShows = [];
            $scope.currentShows = [];
            $scope.upcomingShows = [];
            $scope.shows.forEach(function(show){
                show.opening = new Date(show.openingDate);
                show.closing = new Date(show.closingDate);
                if(show.opening > $scope.today){
                   $scope.upcomingShows.push(show);
                }
                else if(show.closing >= $scope.today){
                    $scope.currentShows.push(show);
                }
                else{
                    $scope.pastShows.push(show);
                }
            });
        });
  }])

  .controller('ShowDetailCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    $scope.show = $routeParams.showId;
    $http.get('shows/' + $routeParams.showId + '.json').success(function(data){
        $scope.show = data;
    });
  }]);