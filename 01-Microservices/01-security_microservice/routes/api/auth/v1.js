var express = require('express');
var router = express.Router();
var jwt    = require('jsonwebtoken');

var md5   = require('../../../modules/md5'); // password encption
//jwt info
var config = require('../../../config'); // get our config file
var superSecret = config.secret; // secret variable

//DB setup.
var mongoose = require('../../../modules/mongoose');
var User   = require('../../../models/user'); // get our mongoose model


// Get authentication token http://localhost:3001/api/auth/v1/authenticate)
router.post('/authenticate', function(req, res) {
  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.', errors: { name : "Authentication failed. User not found."} });
    } else if (user) {
      // check if password matches
      if (user.password != md5(req.body.password, user.salt)) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.', errors: { password : "Authentication failed. Wrong password"} });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign({
          'id': user._id,
          'role': user.role
        }, superSecret, {
          expiresIn : 60*60*24 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
});

router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, superSecret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});

router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

// role check of user (GET http://localhost:8080/api/auth/v1/roleCheck)
router.post('/roleCheck', function(req, res) {
  // post parameters for token
  var token = req.body.token;
  var service = req.body.role;
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, superSecret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        User.findOne({
          name: decoded.data.name
        }, function(err, user) {
          if (err) throw err;
          if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.', errors: { name : "Authentication failed. User not found."} });
          } else if (user) {
              function isInArray(value, array) {
                return array.indexOf(value) > -1;
              }
            console.log(user)
            res.json({ success: isInArray( service, user.role ) });
          }

        }); 
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});


module.exports = router;