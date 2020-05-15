const router = require('express').Router();
const User = require('../models/User');
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
    User.findByIdAndUpdate(req.user.id, {$set: {major: req.body.major}}, function() {
        console.log("Updated user major!");
    });
    res.redirect('/dashboard');
});

module.exports = router;