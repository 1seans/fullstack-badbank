const passport = require('passport');
const express = require ('express')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const keys  = require('./config/keys')

get('/google', passport.authenticate('google', {scope:['profile', 'email'] }))




passport.use(new GoogleStrategy({
    clientID:     keys.GOOGLE_CLIENT_ID,
    clientSecret: keys.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/login/googl/callback",
    passReqToCallback   : true
  },
  async (accessToken, refreshToken, profile, done) => {
    const newUser ={
      googleId: profile.id,
      firstName: profile.name.givenName,
      lasttName: profile.name.familyName 
    }
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      // return done(err, user);
      return done(null, profile);
    // });
  }
));

// passport.serializeUser(function(user) {
//   done(err, user)
// });

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

// passport.deserializeUser(function(user) {
//   done(err, user)
// })