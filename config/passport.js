const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../models/admin');

module.exports = function(passport) {
    passport.serializeUser(function(admin, done) {
        done(null, admin.id);
    });

    passport.deserializeUser(function(id, done) {
        Admin.findById(id, function(err, admin) {
            done(err, admin);
        });
    });

    passport.use('local-login', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback: true
    },
    function(req, username, password, done) {
        Admin.findOne({'username' : username}, function(err, admin) {
            if (err)
                return done(err);
            
            if (!admin)
                return done(null, false, req.flash('loginMessage', 'No admin found.'));
            
            if (!admin.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

            console.log('Success');
            return done(null, admin);
        });
    }));
};