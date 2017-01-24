//'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://tom/kikiscratchedme@ec2-52-52-136-108.us-west-1.compute.amazonaws.com:27017/questions', function(err) {

  if (err) {
    console.log("Failed connecting to Mongodb!");
  } else {
    console.log("Successfully connected to Mongodb!");
  }
});
