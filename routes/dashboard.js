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

router.post('/', function(req, res) {
    console.log(req.body);
    res.redirect('/dashboard');
});

module.exports = router;