const router = require('express').Router()
const passport = require('passport')

// auth login
router.get('/login', function(req, res) {
    res.send('login');
});

// auth with google
router.get('/google', passport.authenticate("google", {
    scope: ['profile']
}));

// auth logout
router.get('/logout', function(req, res) {
    //handle with passport
    res.send('Logout');
});

// redirect route for google
router.get('/google/redirect', passport.authenticate("google"), function(req, res) {
    res.send('You reached the redirect!');
});


module.exports = router;