const router = require('express').Router();
const passport = require('passport');

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
    req.logout();
    res.redirect('/');
});

// redirect route for google
router.get('/google/redirect', passport.authenticate("google"), function(req, res) {
    res.redirect('/dashboard');
});


module.exports = router;