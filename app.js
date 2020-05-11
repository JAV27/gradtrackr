const express = require('express')
const app = express()
const path = require('path')
const ejs = require('ejs')
const authRoutes = require('./routes/auth')
const passportSetup = require('./config/passportSetup')
const PORT = 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//set up routes
app.use('/auth', authRoutes)

//indexs
app.get('/', (req, res) => res.render('index'))

app.listen(PORT, function() {
    console.log("Server is running on port " + PORT);
})