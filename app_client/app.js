angular.module('wifilocApp', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);

angular.module('wifilocApp').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
    })
    .when('/about', {
        templateUrl: 'common/views/genericText.view.html',
        controller: 'aboutCtrl',
        controllerAs: 'vm'
    })
    .when('/location/:locationid', {
        templateUrl: 'locationDetail/locationDetail.view.html',
        controller: 'locationDetailCtrl',
        controllerAs: 'vm'
    })
    .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
}]);