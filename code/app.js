var express = require('express');
var path = require('path');
var mValidator = require('express-validator');
var mBodyParser = require('body-parser');
var mongoose = require("mongoose");
var mCompression = require('compression');

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(mCompression());

var config = require('./config');

app.set('port', process.env.PORT || 8081);


io.on('connection', function(socket) {
    io.emit('hello', { 'message': 'Ahoy! Live connection is established.', 'name': 'Helpmap', 'description': 'Blood Donation Management System' });
    console.log("Socket io is live.");
})


mongoose.connect(config.MONGO_DB_URI, function(error) {
    if (error) {
        console.log("Oops! Connection Failed! " + error);
    } else {
        console.log("Ahoy! Connection Successful with Mongo!");
    }
});

app.use(function(req, res, next) {
    res.io = io;
    next();
});

app.use(mBodyParser.urlencoded({ extended: false }));

// static
app.use(express.static(path.join(__dirname, '/public')));

app.use(mValidator({
    customValidators: {
        isMobileValid: function(value) {
            var pattern = /^\+(?:[0-9] ?){6,14}[0-9]$/;
            console.log(pattern.test(parseInt(value)));
            console.log(value);
            if (pattern.test(value)) {
              console.log("t");
                return true;
            } else {
              console.log("f");
                return false;
            }
        }
    }
}));

var rIndex = require(path.join(__dirname, 'routes/index.js'));
var rDonor = require(path.join(__dirname, 'routes/donor.js'));


app.all('/api', rIndex.sayHi(io));
app.all('/', rIndex.loadClientFile(io, __dirname + '/client.html'));
app.post('/api/donor', rDonor.addDonor(io));
app.get('/api/donor/near', rDonor.nearByDonors(io));
app.put('/api/donor/:donor_id', rDonor.updateDonor(io));
app.delete('/api/donor/:donor_id', rDonor.deleteDonor(io));
app.get('/donor/:donor_id', rDonor.getUpdateDonorForm(io, __dirname + '/update_donor.html'));

// 404 Not Found
app.use(function(req, res) {
    res.status(404);
    res.json({ 'result': 'Page not found', 'status': 404 });
});

// 500 server error
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.json({ 'result': 'Server error. Please try again.', 'status': 500 });
});


server.listen(app.get('port'), function() {
    console.log('app is live.' + app.get('port'));
});
