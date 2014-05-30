'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])

  .directive('myCurrentTime', function($interval, dateFilter) {
  		function link(scope, element, attrs) {
  			var format;
  			var	intervalId;

  			function updateTime(){
  				element.text(dateFilter(new Date(), 'h:mm:ss'));
  			}

  			scope.$watch(attrs.myCurrentTime, function(value){
  				format = value;
  				updateTime();
  			});

  			function updater(){
  				intervalId = $interval(function(){
  					updateTime();
  				}, 1000);
  			}

  			element.bind('$destroy', function(){
  				$interval.cancel(intervalId);
  			});

  			updater();
  		}
  		return {
  			link: link
  		}
  });
