const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const keys = require('./keys');
const User = require('../models/User');
const Requirements = require('../models/Requirement');

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
                //Get University Requirements
                Requirements.findOne({name: "University Requirements"}).then((newRequirement) => {
                    return newRequirement.class_requirements.map((e) => {
                        return {
                            fullName: e.fullName,
                            abbr: e.abbr,
                            status: [
                                {
                                    status_number: 0,
                                    classes_satisfying: 0
                                },
                                {
                                    status_number: 1,
                                    classes_satisfying: 0
                                },
                                {
                                    status_number: 2,
                                    classes_satisfying: 0
                                }
                            ]
                        }
                    });
                }).then((mappedRequirements) => {
                    //create new user
                    console.log(mappedRequirements);
                    new User({
                        username: profile.displayName,
                        googleId: profile.id,
                        requirements: [
                            {
                                name: "University Requirements",
                                class_requirements: mappedRequirements
                            }                   
                        ]
                    }).save().then((newUser) => { 
                        console.log("New user created: " + newUser);
                        done(null, newUser); 
                    });
                });
                
            }
        });

        
  }
));