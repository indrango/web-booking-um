const Booking = require('../models/booking');
const Admin = require('../models/admin');
const passport = require('passport');
const moment = require('moment');
const PDFDocument = require('pdfkit');

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
    date = moment(new Date()).add(-1, 'days')
    yasterday = moment(new Date()).add(-2, 'days');

    Booking
    .find({
        // waktu: { $lt: date , $gt: yasterday}
        waktu: { $lt: date, $gt: yasterday}
    })
    .exec(function(err, users) {
        if (err)
            res.send(err)

        res.render('admin/pages/kursus', {
            users: users,
            today: moment(new Date()).format('DD/MM/YYYY')
        })
    })
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

exports.createPDFUserData = function(req, res) {
    const doc = new PDFDocument()
    let filename = 'Data User'
    filename = encodeURIComponent(filename) + '.pdf'
    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
    res.setHeader('Content-type', 'application/pdf')
    const content = 'ini content'
    doc.y = 300
    doc.text(content, 50, 50)
    doc.pipe(res)
    doc.end()
}

exports.createPDFKursus = function(req, res) {
    const doc = new PDFDocuments()
    let filename = 'Data Kursus'
    filename = encodeURIComponent(filename) + '.pdf'
    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
    res.setHeader('Content-type', 'application/pdf')
    const content = 'ini content'
    doc.y = 300
    doc.text(content, 50, 50)
    doc.pipe(res)
    doc.end()
}