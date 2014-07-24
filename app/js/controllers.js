'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
    controller('headerCtrl', ['$scope', 'dateFormatter', function($scope, dateFormatter){
        $scope.today = new Date();
        $scope.count = 7;
        $scope.count2 = null;
    }])

    .controller('MyCtrl1', ['$scope', '$http', '$interval', 'dateFormatter', function($scope, $http, $interval, dateFormatter) {
        $scope.today = new Date();

        
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
    //$scope.show = $routeParams.showId;
    $http.get('shows/' + $routeParams.showId + '.json').success(function(data){
        $scope.show = data;
        $scope.show.opening = dateFormatter($scope.show.openingDate);
        $scope.show.closing = dateFormatter($scope.show.closingDate);

    });
  }]);