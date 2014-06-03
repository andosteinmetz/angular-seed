'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', ['$scope', '$http', '$interval', 'dateFormatter', function($scope, $http, $interval, dateFormatter, theClock, galllClock) {
        $scope.today = new Date();
        $scope.currentTime = new Date();
        $interval(function(){$scope.currentTime = new Date()}, 1000);
        
        $http.get('shows/shows.json').success(function(data){
            $scope.shows = data;
            $scope.pastShows = [];
            $scope.currentShows = [];
            $scope.upcomingShows = [];
            $scope.shows.forEach(function(show){
                show.opening = dateFormatter(show.openingDate);
                show.closing = dateFormatter(show.closingDate);
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

  .controller('ShowDetailCtrl', ['$scope', '$routeParams', '$http', 'dateFormatter', function($scope, $routeParams, $http, dateFormatter) {
    $scope.show = $routeParams.showId;
    $http.get('shows/' + $routeParams.showId + '.json').success(function(data){
        $scope.show = data;
        $scope.show.opening = dateFormatter($scope.show.openingDate);
        $scope.show.closing = dateFormatter($scope.show.closingDate);

    });
  }]);