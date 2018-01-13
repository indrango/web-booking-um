const Booking = require('../models/booking');
const crypto = require('crypto');
const moment = require('moment');
const nodemailer = require('nodemailer');
const config = require('../config/config');
const Mailgun = require('mailgun-js');
const async = require('async');

exports.getFormRegist = function(req, res) {
    res.render('users/pages/form')
}

exports.getQuotaRemains = function(req, res) {
    Booking.findOne({}).sort('-waktu').exec(function(err, booking) {
        if (err)
            res.send(err)

        console.log(booking)
        quota = 480 - booking.urutan
        date = moment(new Date()).add(1, 'days');
        formatted_date = moment(date).format('DD/MM/YYYY');

        res.render('users/index', {
            quota: quota,
            date: formatted_date
        })
    })
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
    // booking.waktu = new Date(year, month, day)

    booking.save(function(err, bookings) {
        if (err)
            res.send(err);

        console.log(bookings)
        res.json(bookings)
    })
}

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

    booking.save(function(err, bookings) {
        if (err)
            res.send(err)

        let tomorrow = moment(new Date()).add(+1, 'days');
        formatted_date = moment(tomorrow).format('DD/MM/YYYY');

        let data = {
            from: 'admin@um.gunadarma.ac.id',
            to: bookings.email,
            subject: 'UM Schedule for ' + bookings.nama_mhs + ', nomor urut ' + bookings.urutan ,
            html: 
                'Hai ' + bookings.nama_mhs + '<br>' + '<br>' +
                'Selamat! Kamu telah berhasil melakukan registrasi untuk Ujian Mandiri Universitas Gunadarma. Berikut rincian untuk data ujianmu:' + '<br>' + '<br>' +
                'No. Voucher ' + bookings.kd_voucher + '<br>' +
                'NPM : ' + bookings.npm_mhs + '<br>' +
                'Nama : ' + bookings.nama_mhs + '<br>' +
                'Jurusan : ' + bookings.jurusan + '<br>' +
                'Fakultas : ' + bookings.fakultas + '<br>' +
                'Tanggal : ' + formatted_date + '<br>' + 
                'Ruang : ' + bookings.ruang_um + '<br>' +
                'Sesi : ' + bookings.sesi_um + '<br>' +
                'Meja : ' + bookings.meja_um + '<br>' +
                
                'Peserta wajib mengenakan pakaian hitam putih formal dan datang tepat waktu.' + '<br>' + '<br>' +

                'Ujian Mandiri' + '<br>' +
                'Universitas Gunadarma'
        }

        // console.log(bookings)
        // mailgun.messages().send(data, function(err, body) {
        //     if (err) 
        //         console.log('got an error: ', err);
            
        //     console.log('Message send')
            res.render('users/pages/confirmed')
        // })

        // res.json(bookings)
    })
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
    console.log('edit')
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
