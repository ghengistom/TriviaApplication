var jwt = require('jsonwebtoken');

module.exports.authenticate = function(req, res){
          var user = {
                name: 'j',
                email: 'j@gmail.com',
                password: 'jj'
          }
          var token = jwt.sign(user, process.env.secret, {
          expiresIn: 3600}
          );
          res.json({
          success: true,
          token: token
          })
  }
