const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const keys = require('./keys');
const User = require('../models/User');
const ActiveRequirementGroup = require('../models/ActiveRequirementGroup');
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
            if(currentUser) { 
                //user exists
                console.log("User is: " + currentUser);
                done(null, currentUser);
            } else {
                //Get University Requirements
                RequirementGroup.findOne({name: "University Requirements"}).then((RequirementGroup) => {
                    return RequirementGroup.requirements.map((e) => {
                        return {
                            fullName: e.fullName,
                            abbr: e.abbr,
                            status: {
                                needToTake: 0,
                                taking: 0,
                                taken: 0
                            }
                        }
                    });
                }).then((newActiveRequirements) => {
                    //create new user
                    console.log(newActiveRequirements);
                    new User({
                        username: profile.displayName,
                        googleId: profile.id,
                        ActiveRequirementGroups: [
                            new ActiveRequirementGroup({
                                name: "University Requirements",
                                class_requirements: newActiveRequirements
                            })                   
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