const Booking = require('../models/booking');
const Admin = require('../models/admin');
const passport = require('passport');

exports.getAllData = function(req, res) {
    Booking.find(function(err, users) {
        if (err)
            res.send(err);
        
        res.render('admin/pages/main', {
            users: users
        })
    });
}

exports.getKursus = function(req, res) {
    // Booking.find(function(err, users) {
    //     if (err)
    //         res.send(err);
        
    //     res.render('admin/pages/kursus', {
    //         users: users
    //     })
    // });
    Booking
    .find()
    .where('waktu').equals(Date.now())
    .exec(function(err, users) {
        if (err)
            res.send(err)

        res.render('admin/pages/main', {
            users: users
        })
    })
    // Booking.find(function(err, users) {
    //     if (err)
    //         res.send(err);
        
    //     console.log(users[0].waktu)
    //     res.json(users)
    // });
}

exports.getAllUser = function(req, res, next) {
    Admin.find(function(err, admins) {
        if (err)
            res.send(err);
            
        res.json(admins)
    });
}

exports.crateUser = function(req, res, next) {
    console.log(req.body)
    let admin = new Admin();
    admin.username = req.body.username;
    admin.password = admin.generateHash(req.body.username)

    admin.save(function(err, admins) {
        if (err)
            res.send(err);

        res.json(admins)
    });
}

exports.deleteUser = function(req, res, next) {
    Admin.findByIdAndRemove({_id : req.params.user_id}, function(err, admins) {
        if (err)
            res.send(err)

        res.json(admins)
    });
}

exports.getLogin = function(req, res) {
    res.render('admin/index')
}


exports.postLogin = passport.authenticate('local-login', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/admin/login',
    failureFlash : true
});

exports.logout = function(req, res) {
    req.logout();
    res.redirect('/admin');
}