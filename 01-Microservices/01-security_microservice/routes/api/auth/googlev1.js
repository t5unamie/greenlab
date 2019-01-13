var express = require('express');
var router = express.Router();
var url = require('url');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
var passport = require('passport');

 
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
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

router.get('/google', passport.authenticate('google', { scope: 
      [ 'https://www.googleapis.com/auth/plus.login',
      , 'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
));

router.get('/googleAuth', 
    passport.authenticate( 'google', { 
        successRedirect: '/google/success',
        failureRedirect: '/google/failure'
}));

module.exports = router;