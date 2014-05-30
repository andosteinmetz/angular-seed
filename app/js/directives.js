'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])

  .directive('theClock', ['$timeout', function($timeout) {
  		$timeout(function(){
  			var myDate = new Date();
			//var myFormattedDate = myDate.format('mm/dd/yyyy hh:mm:ss');
			//return myFormattedDate;
  		}, 1000);
  		return {
  			template: '<h3>Hi Hi Hi</h3>'
  		}
  }]);
