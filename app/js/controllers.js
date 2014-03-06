'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', ['$scope', '$http', function($scope, $http) {
		$scope.today = new Date();
		$scope.previousShows = new Array();
     	$scope.upcomingShows = new Array();
     	$scope.currentShows = new Array();
		$http.get('shows/shows.json').success(function(data){
			$scope.shows = data;
			$scope.shows.forEach(function(show){
				var openingDate = new Date(show.openingDate);
				var closingDate = new Date(show.closingDate);
				show.jsOpening = openingDate;
				show.jsClosing = closingDate;
				var today = $scope.today;
				console.log($scope.upcomingShows);
				if(openingDate > today){
					$scope.upcomingShows.push(show);
				}
				else if(openingDate <= today){
					if(closingDate >= today){
						$scope.currentShows.push(show);
					}
					else{
						$scope.previousShows.push(show);
					}
				}
			});
		});
  }])
  .controller('MyCtrl2', [function() {

  }])
  .controller('ShowDetailCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    $scope.show = $routeParams.showId;
    $http.get('shows/' + $routeParams.showId + '.json').success(function(data){
        $scope.show = data;
    });
  }]);