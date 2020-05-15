const router = require('express').Router();
const User = require('../models/User');
const RequirementGroup = require('../models/RequirementGroup');

const authCheck = (req, res, next) => {
    if(!req.user) {
        res.redirect('/');
    } else {
        next();
    }
};

router.get('/', authCheck, function(req, res) {
    res.render('dashboard', {
        user: req.user
    });
});

router.post('/', function(req, res) {
    const major = req.user.major;
    const newMajor = req.body.major;
    const oldRequirements = req.user.requirements;

    console.log("Major: " + major + "\nNew Major: " + newMajor);

    if(major !== newMajor) {
        //Removes old requirements if they exist
        if(major !== "None") {
            for(let i=0; i<oldRequirements.length; i++) {
                if(oldRequirements[i].name === major) {
                    User.findById(req.user.id, function(err, user) {
                        user.requirements.pull(oldRequirements[i].id);
                        user.save();
                    });
                }
            }
        }

        //if the user has changed their major
        if(major !== newMajor && newMajor !== "None") {
            console.log("Major has been switched!")
            //Gets requirements for new major
            RequirementGroup.findOne({name: newMajor}, function(err, requirement) {
                console.log("Found: " + requirement.name);
                return requirement.requirements.map((e) => {
                    return {
                        fullName: e.fullName,
                        abbr: e.abbr,
                        minCount: e.minCount,
                        status: {
                            planToTake: 0,
                            taken: 0
                        }
                    }
                })
            }).then((mappedRequirements) => {
                //Adds those requirements to the user
                console.log("Succesfully mapped the requirements! " + mappedRequirements);
                User.findById(req.user.id, function(err, user) {
                    console.log("Found User: " + user.username);
                    user.requirements.push({
                        name: newMajor, 
                        active_requirements: mappedRequirements.requirements
                    });
                    user.save();
                });
            });
        }  

        User.findByIdAndUpdate(req.user.id, {$set: {major: newMajor}}, function() {
            console.log("Updated user major!");
        });
    }

    res.redirect('/dashboard');
});

module.exports = router;