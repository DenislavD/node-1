angular.module('wifilocApp').directive('ratingStars', function() {
    return {
        restrict: 'EA',
        scope: {
            thisRating: '=rating'
        },
        //template: '{{ thisRating }}'
        templateUrl: '/common/directives/ratingStars/ratingStars.template.html'
    };
});