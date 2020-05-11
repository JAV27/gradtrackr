const express = require('express')
const app = express()
const PORT = 3000

app.get('/', (req, res) => res.send('asdasd!'))

app.listen(PORT, function() {
    console.log("Server is running on port " + PORT);
})