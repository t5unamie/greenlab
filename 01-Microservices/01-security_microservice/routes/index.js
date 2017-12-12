var express = require('express');
var router = express.Router();
var _ = require('lodash');

/* DB setup */
var mongoose    = require('mongoose');
// Configuration
var config = require('./../config'); // get our config file
var User   = require('./../models/user'); // get our mongoose model
mongoose.createConnection(config.database); // connect to database

/* GET home page. */
router.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + '/api');
});

router.get('/setup', function(req, res) {

  // create a sample user
  var nick = new User({ 
    name: 'Nick Cerminara', 
    password: 'password',
    admin: true,
    role: [
        "03-secure_microservice", 
        "04-secure_stream_microservice"
      ]
  });

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

module.exports = router;