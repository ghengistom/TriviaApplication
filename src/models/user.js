//this gets you an instance of the mongoose and a mongoose.schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({
  name: String,
  phone: String,
  email: String,
  password: String,
  admin: Boolean
}));
/*
var object = {
              "name": name,
              "phone": phone,
              "email": email,
              "password": password,
              "password2": password2
             };
*/
