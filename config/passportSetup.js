const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const keys = require('./keys')

passport.use(
    new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: "/auth/google/redirect"
    }, function(accessToken, refreshToken, profile, done) {
        console.log(profile);
  }
));