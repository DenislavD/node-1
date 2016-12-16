var mongoose = require('mongoose');

var openingTimeSchema = new mongoose.Schema({
    days: {
        type: String,
        required: true,
    },
    opening: String,
    closing: String,
    closed: {
        type: Boolean,
        required: true,
    }
});

var reviewSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    reviewText: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
});

var locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: String,
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    facilities: [String],
    coords: {
        type: [Number],
        index: '2dsphere',
    },
    openingTimes: [openingTimeSchema],
    reviews: [reviewSchema]
});

//define the model (need to be done here because we defined the schema here)
mongoose.model('Location', locationSchema);

//populate data example
/*
var loc = new Location({
    name: 'Cafe Hero',
    address: '51 Hero Street, Reading, RGA 2PS',
    rating: 2,
    facilities: ['Hot drinks', 'Premium wifi'],
    coords: [-0.9190884, 51.955041],
    openingTimes: [{
        days: 'Monday - Wednesday',
        opening: '8:00am',
        closing: '8:00pm',
        closed: false
    }, {
        days: 'Thurdsay - Saturday',
        closed: true
    }, {
        days: 'Sunday',
        closed: true
    }],
    reviews: [{
        author: 'Simon Holmes',
        rating: 1,
        timestamp: '29 July 2013',
        reviewText: 'What a great place. I can\'t say enough good things about it.'
    }, {
        author: 'Charlie Chaplin',
        rating: 3,
        timestamp: '29 June 2013',
        reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
    }]
});
loc.save(function (err) {
    if (err) {
        console.log(err);
    }
    // saved!
});*/