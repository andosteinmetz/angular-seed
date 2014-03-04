'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', ['$scope', function($scope) {
        $scope.shows = [
            {
                id: 'rainbows',
                title: 'Rainbows Have Nothing To Hide',
                artists: [
                    {name:'Roger Carmona'},
                    {name:'Caitlin Keogh'},
                    {name:'Marley Freeman'},
                    {name:'Eric Legris'}
                ],
                release: 'Lorem ipsum dolor sit amet. Sator arepo tenet opera rotas',
                works: ['one', 'two', 'three', 'four'],
                openingDate: '07/28/13',
                closingDate: '08/05/13'
            },

            {
                id: 'about-time',
                title: 'It\'s About Time',
                artists: [
                    {name:'Sarah Elliot'}
                ],
                release: 'Ipsum ipsum ipsum. Sator arepo tenet opera rotas',
                works: ['table', 'object', 'thingy', 'display case'],
                openingDate:'01/19/14',
                closingDate:'01/27/14'
            },

            {
                id: 'extra-bedroom',
                title: 'Extra Bedroom',
                artists: [
                    {name:'Jojo Li'},
                    {name:'Devon Costello'}
                ],
                release: 'Lorem lorem, ipsum ipsum, everything everything',
                works: ['Bed', 'Table', 'Spill', 'Doodad'],
                openingDate:'03/16/14',
                closingDate:'04/03/14'
            }
        ];
  }])
  .controller('MyCtrl2', [function() {

  }])
  .controller('ShowDetailCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    $scope.show = $routeParams.showId;
    $http.get('shows/' + $routeParams.showId + '.json').success(function(data){
        $scope.show = data;
    });
  }]);