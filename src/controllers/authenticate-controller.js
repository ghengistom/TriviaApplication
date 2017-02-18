var jwt = require('jsonwebtoken');
var User = require('../models/user');

module.exports.authenticate = function(req, res){
          var User = {
                name: 'j',
                email: 'j@gmail.com',
                password: 'jj'
          }
          var token = jwt.sign(User, process.env.secret, {
          expiresIn: 3600}
          );
          res.json({
          success: true,
          token: token
          })
  }
