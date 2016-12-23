angular.module('wifilocApp').directive('navigation', function() {
    return {
        restrict: 'EA',
        templateUrl: '/common/directives/navigation/navigation.template.html',
        controller: 'navigationCtrl',
        controllerAs: 'vmnav'
    };
});