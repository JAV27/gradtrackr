const router = require('express').Router();
const authCheck = (req, res, next) => {
    if(!req.user) {
        res.redirect('/');
    } else {
        next();
    }
};

router.get('/', authCheck, function(req, res) {
    res.render('dashboard', {
        username: req.user.username
    });
});

module.exports = router;