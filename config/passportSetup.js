const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const keys = require('./keys');
const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: "/auth/google/redirect"
    }, function(accessToken, refreshToken, profile, done) {
        //check if user exists
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser) { 
                //user exists
                console.log("User is: " + currentUser);
                done(null, currentUser);
            } else {
                //create new user
                new User({
                    username: profile.displayName,
                    googleId: profile.id
                }).save().then((newUser) => { 
                    console.log("New user created: " + newUser);
                    done(null, newUser); 
                });

                
            }
        });

        
  }
));