'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');

var myModule = angular.module('myApp');

myModule.factory('dateFormatter', function(){
    var dateFormatter = function(date){
        var formattedDate = new Date(date);
        return formattedDate;
    }
    return dateFormatter;
});

myModule.factory('getDateAndTime', function(){
	var getDateAndTime = function(){
		var myDate = new Date();
		var myFormattedDate = myDate.format('mm/dd/yyyy hh:mm:ss');
		return myFormattedDate;	
	}
	return getDateAndTime;
});


