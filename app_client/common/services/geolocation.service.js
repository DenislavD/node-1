angular.module('wifilocApp').service('geolocation', function() {
    return {
        getPosition: function(cbSuccess, cbError, cbNoGeo) {
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
            } else {
                cbNoGeo();
            }
        }
    };
})