const express = require('express')
const app = express()
const path = require('path')
const ejs = require('ejs')
const PORT = 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('index'))

app.listen(PORT, function() {
    console.log("Server is running on port " + PORT);
})