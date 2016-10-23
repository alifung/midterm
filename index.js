//making the node server werk

var express = require('express');
var hbs = require('express-handlebars');
var bodyParser = require('body-parser');
var Mongoose = require('mongoose');
var path = require('path');

var app = express();

require('dotenv').config();

Mongoose.connect(process.env.DB_URL);

var portNum = 8888;
app.set('port', portNum);

// tell express to use handlebars
app.engine('handlebars', hbs({defaultLayout: 'main'}) );
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

var api = require('./routes/api');
app.use('/api', api);

var Cheese = require('./routes/cheeses')
app.use('/cheeses', Cheese) //connecting to the cheeses.js -- so you know where to get the routes


app.use( express.static(path.join(__dirname + '/public')) );

// start server
app.listen(portNum, function() {
  console.log('listening on port ', portNum);
});