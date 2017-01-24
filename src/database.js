//'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://tom:kikiscratchedme@host:27017/questions?authSource=dbWithUserCredentials', function(err) {

  if (err) {
    console.log("Failed connecting to Mongodb!");
  } else {
    console.log("Successfully connected to Mongodb!");
  }
});
