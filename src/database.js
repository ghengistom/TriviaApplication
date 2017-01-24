//'use strict';

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/quizz-app', function(err) {

  if (err) {
    console.log("Failed connecting to Mongodb!" + err);
  } else {
    console.log("Successfully connected to Mongodb!");
  }
});
