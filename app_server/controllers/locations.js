var request = require('request');
//request uses only full paths, setup server as variable
var apiOptions = {
    server: 'http://localhost:3000'
};
if(process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://replace-with-live-url.com';
}

var renderHomePage = function(req, res, locArr) {
    var message;
    if(!(locArr instanceof Array)) {
        message = 'API lookup error';
        locArr = [];
    } else {
        if(!locArr.length) {
            message = 'No places found nearby';
        }
    }

    res.render('locations-list', {
        title: 'WifiLoc - find a place to work with wifi',
        pageHeader: {
            title: 'WifiLoc',
            strapline: 'Find places to work with wifi near you!'
        },
        sidebar: 'Looking for wifi and a seat? WifiLoc helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let WifiLoc help you find the place you\'re looking for.',
        locations: locArr,
        message: message
    });
};

var renderDetailPage = function(req, res, locDetail) {
    res.render('location-info', {
        title: locDetail.name,
        pageHeader: {
            title: locDetail.name
        },
        sidebar: {
            context: 'is on WifiLoc because it has accessible wifi and space to sit down with your laptop and get some work done.',
            callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        },
        location: locDetail
    });
};

var renderReviewForm = function(req, res, locDetail) {
    res.render('location-review-form', {
        title: 'Review ' + locDetail.name + ' on WifiLoc',
        pageHeader: {
            title: 'Review ' + locDetail.name
        },
        error: req.query.err
    });
};

var getLocationInfo = function(req, res, callback) {
    var path = '/api/locations/' + req.params.locationid;
    var requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {}
    };
    request(requestOptions, function(err, response, body) {
        if(response.statusCode === 200) {
            var coords = body.coords;
            body.coords = {
                lng: coords[0],
                lat: coords[1]
            };
            callback(req, res, body);
        } else {
            _showError(req, res, response.statusCode);
        }
    });
};

var _formatDistance = function(distance) {
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

var _showError = function(req, res, status) {
    var title, content;
    if(status === 404) {
        title = '404, page not found';
        content = 'Oh dear. Look like we can\'t find this page. Sorry.';
    } else {
        title = status + ', something\'s gone wrong';
        content = 'Something, somewhere, has gone just a little bit wrong';
    }

    res.status(status);
    res.render('generic-text', {
        title: title,
        content: content
    });
};


/* GET Home page */
module.exports.homeList = function(req, res, next) {
    var path = '/api/locations';
    var requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {},
        qs: {
            lng: -0.79925,
            lat: 51.37809,
            dis: 50,
        }
    };
    request(requestOptions, function(err, response, body) {
        if(response.statusCode === 200 && body.length) {
            for(var el, i = 0; i < body.length; i++) {
                el = body[i];
                el.distance = _formatDistance(el.distance);
            }
        }
        renderHomePage(req, res, body);
    });
};

/* GET Location info page */
module.exports.locationInfo = function(req, res) {
    getLocationInfo(req, res, renderDetailPage);
};

/* GET Add review page */
module.exports.addReview = function(req, res) {
    getLocationInfo(req, res, renderReviewForm);
};

/* POST Add review page */
module.exports.doAddReview = function(req, res) {
    var locationid = req.params.locationid;
    var path = '/api/locations/' + locationid + '/reviews';
    var postData = {
        author: req.body.name,
        rating: parseInt(req.body.rating),
        reviewText: req.body.review
    };
    var requestOptions = {
        url: apiOptions.server + path,
        method: 'POST',
        json: postData
    };

    //node/express validation
    if(!postData.author || !postData.rating || !postData.reviewText) {
        res.redirect('/location/' + locationid + '/review/new?err=val');
    } else {
        //call to db api
        request(requestOptions, function(err, response, body) {
            if(response.statusCode === 201) {
                res.redirect('/location/' + locationid);
            } else if(response.statusCode === 400 && body.name && body.name === 'ValidationError') {
                //mongoose validation failed
                res.redirect('/location/' + locationid + '/review/new?err=val');
            } else {
                _showError(req, res, response.statusCode);
            }
        });
    }
};
