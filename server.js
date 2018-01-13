const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const passport = require('passport');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const config = require('./config/config')
const app = express();

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'passwordnyasatuduatiga' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// user
// app.get('/', function(req, res) {
//     res.render(__dirname + '/views/users/index')
// })

// set up mongoose
mongoose.connect(config.database, function(err) {
    if (err)
        console.log('connection failed!');
    else
        console.log('connected')
});

// routes
require('./controllers/routes')(app);

// passport
require('./config/passport')(passport)

app.listen(3000, function() {
    console.log('listening on http://localhost:3000')
}) 