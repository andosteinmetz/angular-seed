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
            // TODO - PUT THIS DATA IN THE MODEL, WHERE IT BELONGS
            // TODO - do the drawing functions belong in the model???
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

            function Rotor(options){
                this.options = options;
                this.st = paper.set();
            }

            Rotor.prototype.inscribeRectangle = function(rotation,vars){
                // this draws the base rectangle
                var sideLength = vars.radius ? vars.radius*2 : canvasSize;
                var inscribed = paper.path("M"+ center +" "+ strokeWidth +"L"+ (sideLength - strokeWidth) + " "+ center + "L" + center +" " + (sideLength - strokeWidth) +"L"+ strokeWidth +" "+ center+"Z closepath");
                var myColor = vars.color ? vars.color : '#00aaaa';
                var myOpacity = vars.opacity ? vars.opacity : 0.125;
                inscribed.attr('fill', myColor);
                inscribed.attr('fill-opacity', myOpacity/2);
                inscribed.attr('stroke-opacity',myOpacity);
                inscribed.attr('stroke', myColor);
                if(rotation){
                    inscribed.transform("r"+ rotation +","+ center +","+ center);
                }
                return(inscribed);
            };

            Rotor.prototype.radiateRect = function(num){
                var degree = 360 / num;
                var self = this;
                for (var i = 0; i < num; i++) {
                    var rotation = i * degree;
                    self.inscribeRectangle(rotation);
                }
            };

            Rotor.prototype.animateRect = function (){
                var count = this.options.count;
                var options = this.options;
                for (i = 0; i < this.st.length; i++){
                    var el = this.st[i];
                    el.remove();
                }
                this.stopTimeout();

                var myColor = options && options.color ? options.color : "#0000ff";
                var myRadius = options && options.radius ? options.radius : 250;
                var myOpacity = options && options.opacity ? options.opacity : 0.125;
                var deg = 360 / count;
                var i = 0;
                var self = this;
                // THE LOOP
                function iterateRect(i) {
                    var rotation = deg * i;
                    if(count > 0){
                        self.st.push(self.inscribeRectangle(rotation, {color: myColor, radius: myRadius, opacity: myOpacity}));
                        i++;
                        if (i < count) {
                            self.myTimeout = setTimeout(function () {
                                iterateRect(i);
                            }, 100);
                        }
                    }
                }
//
                iterateRect(i);
                console.log(this.st);
            };

            Rotor.prototype.stopTimeout = function(){
                clearTimeout(this.myTimeout);
            };

            var myRotor = new Rotor($scope.rotors[0]);
            var myRotor2 = new Rotor($scope.rotors[1]);

            $scope.$watch('rotors[0].count', function(){
                myRotor.animateRect();
            });

            $scope.$watch('rotors[1].count', function(){
                myRotor2.animateRect();
            });

            //$scope.rotors.forEach(function(thisGuy){
            //    //console.log(thisGuy);
            //    $scope.$watch(thisGuy.count, function(){
            //        var myRotor = new Rotor(thisGuy);
            //        myRotor.animateRect();
            //    });
            //});

        }

        return {
            link: link
        };
        //TODO -  what does this return???
    })

    .directive('mouser', function(){
        function link($scope, element, attrs){
            var myEl = element[0];
        }
    });