angular.module('wifilocApp').filter('formatDistance', function() {
    //angular filters need to return a function, not the result
    return function(distance) {
        distance = parseFloat(distance) || 0;
        var numDistance, unit;
        if(distance > 1000) {
            numDistance = parseFloat(distance / 1000).toFixed(1);
            unit = 'km';
        } else {
            numDistance = parseInt(distance);
            unit = 'm';
        }
        return numDistance + unit;
    };
});