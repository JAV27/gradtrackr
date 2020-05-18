const router = require('express').Router();
const authCheck = require('../assets/authCheck');
const Semester = require('../models/Semester');

router.get('/', authCheck, function(req, res) {
    res.render('semester', {
        user: req.user,
        success: req.query.success
    });
});

router.get('/add', authCheck, function(req, res) {
    res.render('addSemester', {
        user: req.user,
        nameError: req.query.nameError,
        whenError: req.query.whenError
    });
});

router.post('/add', function(req, res) {
    let nameError = false;
    let whenError = false;

    if(req.body.name === '') {
        nameError = true;
    }

    if(req.body.when === undefined) {
        whenError = true;
    }

    if(nameError || whenError) {
        res.redirect('/semester/add?nameError=' + nameError + '&whenError=' + whenError);
    } else {
        new Semester({
            name: req.body.name,
            when: req.body.when
        }).save().then((newSemester) => {
            console.log('Added a new semester!', newSemester);
            res.redirect('/semester?success=true');
        });
    } 
});

router.post('/cancel', function(req, res) {
    res.redirect('/semester');
});

module.exports = router;