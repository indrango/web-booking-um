const Booking = require('../models/booking');
const crypto = require('crypto');
const moment = require('moment');
const nodemailer = require('nodemailer');
const config = require('../config/config');
const Mailgun = require('mailgun-js');

exports.getFormRegist = function(req, res) {
    res.render('users/pages/form')
}

exports.getAllData = function(req, res, next) {
    Booking.find(function(err, users) {
        if (err)
            res.send(err);
        res.json(users)
    });
}

exports.saveData = function(req, res) {
    let booking = new Booking();
    const idGen = crypto.randomBytes(4).toString('hex')
    booking.id_booking = idGen
    booking.kd_voucher = req.body.kd_voucher
    booking.npm_mhs = req.body.npm_mhs
    booking.nama_mhs = req.body.nama_mhs
    booking.jenis_kel = req.body.jenis
    booking.tgl_lahir = req.body.tgl_lahir
    booking.fakultas = req.body.fakultas
    booking.jurusan = req.body.jurusan
    booking.email = req.body.email

    booking.save(function(err, bookings) {
        if (err)
            res.send(err);

        console.log(bookings)
        res.json(bookings)
    })
}

// exports.verifData = function(req, res) {
//     let booking = new Booking();
//     const idGen = crypto.randomBytes(4).toString('hex')
//     booking.id_booking = idGen
//     booking.kd_voucher = req.body.kd_voucher
//     booking.npm_mhs = req.body.npm_mhs
//     booking.nama_mhs = req.body.nama_mhs
//     booking.jenis_kel = req.body.jenis
//     booking.tgl_lahir = req.body.tgl_lahir
//     booking.fakultas = req.body.fakultas
//     booking.jurusan = req.body.jurusan
//     booking.email = req.body.email

//     console.log(booking)

//     res.render('users/pages/verification', {
//         data: booking
//     })
// }

exports.submitData = function(req, res) {
    let mailgun = new Mailgun({apiKey: config.api_key, domain: config.domain})

    let booking = new Booking();
    const idGen = crypto.randomBytes(4).toString('hex')
    booking.id_booking = idGen
    booking.kd_voucher = req.body.kd_voucher
    booking.npm_mhs = req.body.npm_mhs
    booking.nama_mhs = req.body.nama_mhs
    booking.jenis_kel = req.body.jenis
    booking.tgl_lahir = req.body.tgl_lahir
    booking.fakultas = req.body.fakultas
    booking.jurusan = req.body.jurusan
    booking.email = req.body.email

    console.log(req.body)

       
    // booking.save(function(err, bookings) {
    //     if (err)
    //         res.send(err);

    //     console.log(bookings)
    //     // res.json(bookings)
    // })

    let data = {
        from: 'admin@um.gunadarma.ac.id',
        to: req.body.email,
        subject: 'UM Schedule for ' + req.body.nama_mhs,
        html: 'This is requirement you bring for UM. <br> ' + req.body.kd_voucher + 'Thanks'
    }


    mailgun.messages().send(data, function(err, body) {
        if (err) 
            console.log('got an error: ', err);
        
        console.log('Message send')
    });


    res.render('users/pages/confirmed')
};

exports.editForm = function(req, res) {
    data = req.body.nama
    console.log(data)
    res.render('users/pages/form')
}

exports.getData = function(req, res, next) {
    Booking.findById(req.params.user_id, function(err, bookings) {
        if (err)
            res.send(err);
        res.json(bookings)
    });
}


exports.editData = function(req, res, next) {
    Booking.findById(req.params.user_id, function(err, booking) {
        if (err)
            res.send(err)

        if (req.body.nama_mhs) booking.nama_mhs = req.body.nama_mhs;

        booking.save(function(err, bookings) {
            if (err)
                res.send(err)

            res.json(bookings)
        });
    });
}


exports.deleteData = function(req, res, next) {
    Booking.findByIdAndRemove({_id : req.params.user_id}, function(err, bookings) {
        if (err)
            res.send(err)

        res.json(bookings)
    });
}
