const Booking = require('../models/booking')
const crypto = require('crypto')

module.exports = function(app) {

    // data from api/users
    app.route('/api/users')
        // get data
        .get(function(req, res) {
            Booking.find(function(err, users) {
                if (err)
                    res.send(err);
                res.json(users)
            });
        })

        // post data
        .post(function(req, res, next) {
            let booking = new Booking();
            const idGen = crypto.randomBytes(4).toString('hex')
            booking.id_booking = idGen
            booking.kd_voucher = req.body.kd_voucher
            booking.npm_mhs = req.body.npm_mhs
            booking.nama_mhs = req.body.nama_mhs
            booking.jenis_kel = req.body.jenis_kel
            booking.tgl_lahir = req.body.tgl_lahir
            booking.fakultas = req.body.fakultas
            booking.jurusan = req.body.Jurusan
            booking.email = req.body.email

            booking.save(function(err, bookings) {
                if (err)
                    res.send(err);

                res.json(bookings)
            });
        });
    
    // data from :user_id
    app.route('/api/users/:user_id')
        // get data
        .get(function(req, res) {
            Booking.findById(req.params.user_id, function(err, bookings) {
                if (err)
                    res.send(err);
                res.json(bookings)
            });
        })

        // update data
        .put(function(req, res) {
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
        })

        // delete data
        .delete(function(req, res) {
            Booking.findByIdAndRemove({_id : req.params.user_id}, function(err, bookings) {
                if (err)
                    res.send(err)

                res.json(bookings)
            });
        });

};