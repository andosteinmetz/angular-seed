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
        };
    })

    .directive('myClock', function($interval){
        function link(scope, element, attrs){

            var intervalId;
            var myElementId = element[0].id;

            //time variables
            var seconds;
            var minutes;
            var hours;

            //clock variables
            var radius = 50;
            var strokeWidth = 4;
            var canvasSize = (radius *2)+(strokeWidth*2);
            var center = radius + strokeWidth;
            var paper = Raphael(document.getElementById(myElementId), canvasSize,canvasSize);
            var circle = paper.circle(center,center,radius);
            var secondHand = paper.path("M"+ center + " "+ (center + strokeWidth*3) +"L"+ center +" "+ strokeWidth);
            var minuteHand = paper.path("M"+ center + " " + (center + strokeWidth*2) +"L"+ center +" "+ strokeWidth*2);
            var hourHand = paper.path("M"+ center +" "+ (center + strokeWidth *1) +"L"+ center +" "+ strokeWidth*6);

            secondHand.attr('stroke', '#f00');
            hourHand.attr('stroke-width', 2);
            circle.attr('fill', '#fff');
            circle.attr('stroke', '#000');
            circle.attr('sroke-width', strokeWidth);

            function drawTickMark(deg){
                var mark = paper.path("M"+ center +" "+ strokeWidth*2 +"L"+ center +" "+ strokeWidth*3);
                mark.attr("stroke", "#666");
                mark.transform("r"+ deg +","+ center +","+center);
            }

            function tickMarks(){
                for(var i = 0; i < 12; i++){
                    var deg = i * 30;
                    drawTickMark(deg);
                }
            }

            tickMarks();

            function updateClock(){
                var d = new Date();
                seconds = d.getSeconds();
                minutes = d.getMinutes();
                hours = d.getHours();

                minutes = minutes + seconds/60;
                hours = hours + minutes/60;
                if (hours > 12){
                    hours = hours - 12;
                }

                var secondHandRotation = (seconds/60) * 360;
                var minuteHandRotation = (minutes/60) * 360;
                var hourHandRotation = (hours/12) * 360;

                secondHand.transform("r"+ secondHandRotation +","+center+","+ center);

                //move second hand continuously
                //var nextSecond = (( seconds +1)/60) * 360;
                //secondHand.animate({transform: "r"+nextSecond+","+center+","+center}, 1000);
                minuteHand.transform("r"+ minuteHandRotation +","+ center +","+ center);
                hourHand.transform("r"+ hourHandRotation +","+ center +","+ center);
            }

            updateClock();

            intervalId = $interval(function(){
                updateClock();
            }, 1000);

            element.bind('$destroy', function(){
                $interval.cancel(intervalId);
            });

        }
        return {
            link: link
        };
    })

    .directive('myDoodle', function(){
        function link($scope, element, attrs){

            var myElement = element[0];
            // TODO - MAKE SEPARATE RADIUS FOR EACH Rotator
            var radius = 250;
            var strokeWidth = 4;
            var canvasSize = (radius *2)+(strokeWidth*2);
            var center = radius + strokeWidth;
            var paper = Raphael(myElement, canvasSize,canvasSize);

            function drawCircle(center, radius){
                var circle = paper.circle(center,center,radius);
            }


            function drawLine(deg){
                var mark = paper.path("M"+ center +" "+ strokeWidth +"L"+ strokeWidth +" "+ center);
                mark.attr("stroke", "#666");
                mark.transform("r"+ deg +","+ center +","+ center);
            }

            function inscribeRectangle(rotation, vars){
                var inscribed = paper.path("M"+ center +" "+ strokeWidth +"L"+ (canvasSize - strokeWidth) + " "+ center + "L" + center +" " + (canvasSize - strokeWidth) +"L"+ strokeWidth +" "+ center+"Z closepath");

                var myColor = vars.color ? vars.color : '#00aaaa';
                var myOpacity = vars.opacity ? vars.opacity : 0.125;
                inscribed.attr('fill', myColor);
                inscribed.attr('fill-opacity', myOpacity/10);
                inscribed.attr('stroke-opacity',myOpacity);
                inscribed.attr('stroke', myColor);
                if(rotation){
                    inscribed.transform("r"+ rotation +","+ center +","+ center);
                }
            }

            function lines(){
                for(var i = 0; i < 12; i++){
                    var deg = i * 30;
                    drawLine(deg);
                }
            }

            function radiateRect(num) {
                var degree = 360 / num;
                for (var i = 0; i < num; i++) {
                    var rotation = i * degree;
                    inscribeRectangle(rotation);
                }
            }
            var myTimeout;
            function animateRect(count, options){
                paper.clear();
                var myColor = options && options.color ? options.color : "#0000ff";
                var deg = 360/count;
                var i = 0;
                function iterateRect(i){
                    var rotation = deg * i;
                    //var opacity = 1/count;
                    inscribeRectangle(rotation, {color: myColor});
                    i++;
                    if(i < count){
                        myTimeout = setTimeout(function(){
                            iterateRect(i);
                        }, 100);
                    }
                }
                iterateRect(i);
            }
            $scope.$watch('count', function(){
                clearTimeout(myTimeout);
                animateRect($scope.count, {color: "#00ffff"});
                animateRect($scope.count2, {color:'#ff0000'});
            });
        }

        return {
            link: link
        };

    })

    .directive('mouser', function(){
        function link($scope, element, attrs){
            var myEl = element[0];
        }
    });