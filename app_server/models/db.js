var mongoose = require('mongoose');
var gracefulShutdown;
var dbURI = 'mongodb://localhost/wifiloc';
mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
    console.warn('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
    console.warn('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
    console.warn('Mongoose disconnected');
});

gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

//for nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});

process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});

process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app shutdown', function() {
        process.exit(0);
    });
});