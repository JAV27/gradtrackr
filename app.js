const express = require('express');
const app = express(); // init app 
const path = require('path');
const ejs = require('ejs');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const passportSetup = require('./config/passportSetup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const coookieSession = require('cookie-session');
const passport = require('passport'); 
const bodyParser = require('body-parser');
const PORT = 3000;

//Uncomment to add requirementGroup
// const addRequirement = require('./addRequirement');

// load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// cookie encryption
app.use(coookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));

// Mongoose deprecation fixes
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, function() {
    console.log("Connected!");
});

// set up auth route
app.use('/auth', authRoutes);

//set up dashboard ruote
app.use('/dashboard', dashboardRoutes);

// get index route
app.get('/', function(req, res) {
    res.render('index', {
        user: req.user
    });
});

// start server
app.listen(PORT, function() {
    console.log("Server is running on port " + PORT);
});