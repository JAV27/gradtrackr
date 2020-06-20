const router = require('express').Router();
const authCheck = require('../assets/authCheck');
const Semester = require('../models/Semester');
const User = require('../models/User');
const bodyParser = require('body-parser'); 
const Class = require('../models/Class');

router.get('/', authCheck, function(req, res) {
    User.findById(req.user.id).populate('semesters').exec((err, userWithSemesters) => {
        res.render('semester', {
            user: userWithSemesters,
            success: req.query.success
        })
    });
});

router.get('/edit/:id', authCheck, function(req, res) {

    Semester.findById(req.params.id, (err, semester) => {
        res.render('editSemester', {
            semester: semester
        });
    });

});

router.post('/edit/:id', authCheck, function(req, res) {
   
    let semester = {
        name: req.body.name,
        when: req.body.when,
    };

    Semester.findByIdAndUpdate(req.params.id, semester, function(err) {
        if(err) {
            console.log(err);
            return; 
        } else {
            res.redirect('/');
        }
    })

});

router.get('/:id/add/class', authCheck, (req, res) => {
    Class.find({}, (err, classes) => {
        if(err) {
            console.log(err);
            return;
        } else {
            res.render('addClass', {
                semId: req.params.id,
                classes: classes
            });
        }
    })
});

router.post('/:id/add/class', authCheck, (req, res) => {

    Class.findById(req.body.class, (err, c) => {
        Semester.findByIdAndUpdate(req.params.id, {$push: { classes_taken: c }}, (err) => {
            if(err) {
                console.log(err);
                return;
            } else {
                res.redirect('/semester/edit/' + req.params.id);
            }
        });
    })

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
            when: req.body.when,
            classes_taken: []
        }).save().then((newSemester) => {
            User.findById(req.user.id, function(err, user) {
                user.semesters.push(newSemester);
                user.save();
            });

            res.redirect('/semester?success=true');
        });
    } 
});

router.post('/cancel', function(req, res) {
    res.redirect('/semester');
});

module.exports = router;