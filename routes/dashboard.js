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
        user: req.user
    });
});

module.exports = router;