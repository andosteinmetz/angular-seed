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
  })

  .directive('mySVGCircle', function($interval){
    function link(scope, element, attrs){

        var radius = 50;
        var strokeWidth = 4;

        var canvasSize = (radius *2)+(strokeWidth*2);
        var center = radius + strokeWidth;

        var paper = Raphael(document.getElementById('circle'), canvasSize,canvasSize);
        var circle = paper.circle(center,center,radius);
        var secondHand = paper.path("M"+center+" "+center+"L"+center+" "+strokeWidth);
        var minuteHand = paper.path("M"+center+" "+center+"L"+center+" "+strokeWidth*2);
        var hourHand = paper.path("M"+center+" "+center+"L"+center+" "+strokeWidth*4);

        secondHand.attr('stroke', '#f00');

        circle.attr('fill', '#fff');
        circle.attr('stroke', '#000');
        circle.attr('sroke-width', strokeWidth);



        function updateClock(){
            var d = new Date();
            var seconds = d.getSeconds();
            var minutes = d.getMinutes();
            var hours = d.getHours();
            hours = hours + (minutes/60);
            if (hours > 12){
                hours = hours - 12;
            }

            var secondHandRotation = (seconds/60) * 360;
            var minuteHandRotation = (minutes/60) * 360;
            var hourHandRotation = (hours/12) * 360;

            secondHand.transform("r"+secondHandRotation+","+center+","+center);
            minuteHand.transform("r"+minuteHandRotation+","+center+","+center);
            hourHand.transform("r"+hourHandRotation+","+center+","+center);
        }

        updateClock();

        $interval(function(){
            updateClock();
        }, 1000);

    }
    return {
        link: link
    }
  });
