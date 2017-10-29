const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config/config')

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());

// user
app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/views/admin/index.html')
})

// admin
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/user/index.html')
})

// set up mongoose
mongoose.connect(config.database, function(err) {
    if (err)
        console.log('connection failed!');
    else
        console.log('connected')
});


// routes
require('./controllers/bookingRoutes')(app);

app.listen(3000, function() {
    console.log('listening on http://localhost:3000')
}) 