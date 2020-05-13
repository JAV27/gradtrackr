const express = require('express');
const app = express(); // init app 
const path = require('path');
const ejs = require('ejs');
const authRoutes = require('./routes/auth');
const passportSetup = require('./config/passportSetup');
const PORT = 3000;

// load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set up route
app.use('/auth', authRoutes);

// get index route
app.get('/', function(req, res) {
    res.render('index');
});

// start server
app.listen(PORT, function() {
    console.log("Server is running on port " + PORT);
});