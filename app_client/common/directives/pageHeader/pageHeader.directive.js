angular.module('wifilocApp').directive('pageHeader', function() {
    return {
        restrict: 'EA',
        scope: {
            content: '=content'
        },
        templateUrl: '/common/directives/pageHeader/pageHeader.template.html'
    };
});