angular.module('wifilocApp').filter('addHtmlLineBreaks', function() {
    //angular filters need to return a function, not the result
    return function(text) {
        var output = text.replace(/\n/g, '<br/>');
        return output;
    };
});