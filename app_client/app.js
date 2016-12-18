angular.module('wifilocApp', ['ngRoute']);

angular.module('wifilocApp').config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
    })
    .otherwise({redirectTo: '/'});
}]);