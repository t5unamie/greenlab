var express = require('express');
var router = express.Router();
var url = require('url');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
var passport = require('passport');
var jwt    = require('jsonwebtoken');
var md5   = require('../../../modules/md5'); // password encption
//jwt info
var config = require('../../../config'); // get our config file
var superSecret = config.secret; // secret variable

//DB setup.
var mongoose = require('../../../modules/mongoose');
var User   = require('../../../models/user'); // get our mongoose model

 
// Use the client id and secret you received when setting up your OAuth account
var GOOGLE_CLIENT_ID = 'XXX_GOOGLE_CLIENT_ID_XXX'
var GOOGLE_CLIENT_SECRET = 'XXX_GOOGLE_CLIENT_SECRET_XXX'

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "https://sec-ms.green-labs.io/api/auth/googlev1/googleAuth",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
   /** User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });  **/
    console.log(profile["email"])
    return done(null, profile );
  }
));

router.get('/google', passport.authenticate('google', { scope: 
      [ 'https://www.googleapis.com/auth/plus.login',
      ,'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
));

router.get('/googleAuth', 
    passport.authenticate( 'google', { 
        successRedirect: '/',
        failureRedirect: '/api/auth/googlev1/google/failure'
}));

module.exports = router;