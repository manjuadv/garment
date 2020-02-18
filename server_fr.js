var express = require('express');

var app = express();

/*app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1234');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});*/

app.use(express.static('./gar_app'));

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');

app.use(cookieParser());
app.use(bodyParser());
app.use(cookieSession({ secret: 'app_1' }));

/*
app.get('/propertyads', function(req, res) {
    res.send(getPropertyAds());
});

app.get('/houseAd/:id', function(req, res) {
    res.send(getHouseAdFn(req.params.id));
});*/

app.listen(80);
console.log('Listening on port 80...');