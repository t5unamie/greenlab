var express = require('express');
var router = express.Router();
var jwt    = require('jsonwebtoken');
var randomstring = require("randomstring");

var md5   = require('../../../modules/md5'); // password encption
//jwt info
var config = require('../../../config'); // get our config file
var superSecret = config.secret; // secret variable

//DB setup.
var mongoose = require('../../../modules/mongoose');
var User   = require('../../../models/user'); // get our mongoose model

// Create user
// Get authentication token http://localhost:3001/api/userManagement/v1/register)
router.post('/register', function(req, res) {
  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;
    if (user) {
      res.json({ success: false, message: 'user exists', errors: { name : "User already exists"} });
    } else  {

        var saltvalue = randomstring.generate();
        var encrptedP = md5(req.body.password, saltvalue);

          var newUser = new User({ 
            email: req.body.email,
            name: req.body.name, 
            password: encrptedP,
            salt   : saltvalue,
            firstn : req.body.lastn,
            firstn : req.body.firstn,
            admin: false,
            role: [
                "02-iot-data"
              ]
          });

            newUser.save(function(err) {
              if (err) throw err;
            });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'user created',
        });  

    }

  });
});

// Delete user

router.post('/delete_user', function(req, res) {
  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.', errors: { name : "Authentication failed. User not found."} });
    } else if (user) {
      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.', errors: { password : "Authentication failed. Wrong password"} });
      } else {

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'user created',
        });
      }   

    }

  });
});

//username lookup
// route to return all users (GET http://localhost:3001/api/userManagement/v1/users)
// Remined protect this path with rat limiting
/*router.post('/existCheck', function(req, res) {
    User.findOne({
    name: req.body.name,
  }, function(err, user) {
    if (err) throw err;
    if (user) {
      res.json({ success: false, message: 'user exists', errors: { name : "User already exists"} });
    } else {

    }
    if (email) {

  });
});*/

// Edit user

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


module.exports = router;