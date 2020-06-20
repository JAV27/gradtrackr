const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const keys = require('./keys');
const User = require('../models/User');
const RequirementGroup = require('../models/RequirementGroup');

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
            console.log(currentUser);
            if(currentUser) { 
                //user exists
                done(null, currentUser);
            } else {
                //Get University Requirements
                RequirementGroup.findOne({name: "University Requirements"}).then((newRequirementGroup) => {
                    return newRequirementGroup.requirements.map((e) => {
                        return {
                            fullName: e.fullName,
                            abbr: e.abbr,
                            minCount: e.minCount,
                            status: {
                                planToTake: 0,
                                taken: 0
                            }
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
                                active_requirements: mappedRequirements
                            }                   
                        ]
                    }).save().then((newUser) => { 
                        done(null, newUser); 
                    });
                });
                
            }
        });

        
  }
));