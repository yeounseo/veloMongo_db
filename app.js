//  load package
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// configure mongoose
// connect to mongodb server
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
    //  connected to mongodb server
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/mongodb_tutorial');
// mongoose.connect() 메소드로 서버에 접속을 할 수 있으며, 따로 설정 할 파라미터가 있다면 다음과 같이 uri를 설정하면 된다.
// mongoose.connect('mongodb://username:password@host:port/database?options...');
var Book = require('./models/book');

//  configure app to use bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//  configure server port
var port = process.env.PORT || 8080;

// configure router
var router = require('./routes')(app, Book);

// run server 
var server = app.listen(port, function () {
    console.log("Express server has started on port" + port);
});
