const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const autoIncrement = require('mongoose-auto-increment');

const BookingSchema = new Schema({
    id_booking: {
        type: String,
        required: true
    },
    kd_voucher: String,
    npm_mhs: String,
    nama_mhs: String,
    jenis_kel: String,
    tgl_lahir: String,
    fakultas: String,
    jurusan: String,
    email: String,
    waktu: {
        type: Date,
        default: Date.now
    },
    urutan: Number,
    sesi_um: String,
    ruang_um: String,
    meja_um: String
});

let connection = mongoose.createConnection('mongodb://localhost/web-booking-um');
autoIncrement.initialize(connection)

// declare auto increment
BookingSchema.plugin(autoIncrement.plugin, {
    model: 'Booking', 
    field: 'urutan',
    startAt: 1
});



// preprocessing
BookingSchema.pre('save', function(next) {
let booking = this;

    // check data if npm on data or not
    // BookingModel.findOne({npm_mhs: this.npm_mhs}, function(err, data) {
    //     // check if data is exists
    //     if (!data)
    //         console.log('Data not found');

    //     else {
    //         console.log('Data found')
    //         now = moment().format('ddd MMM DD YYYY')
    //         console.log(now)
    //         console.log(data.waktu.toDateString())
    //         if (data.waktu.toDateString() == now) {
    //             console.log(booking.urutan);
    //             booking.urutan += 120;
    //             console.log(booking.urutan);

    //         }
    //     }
        
    // });

    // sesi 1
    if (booking.urutan < 120) {
        booking.sesi_um = 'Sesi 1'
        if (booking.urutan <= 40) {
            booking.ruang_um = 'Ruang A';
            booking.meja_um = 'A' + booking.urutan;
        } else if ((booking.urutan > 40) && (booking.urutan <= 80)) {
            booking.ruang_um = 'Ruang B'
            booking.meja_um = 'B' + (booking.urutan - 40);
        } else if ((booking.urutan > 80) && (booking.urutan <= 120)) {
            booking.ruang_um = 'Ruang C'
            booking.meja_um = 'C' + (booking.urutan - 80);
        }
    
    // sesi 2
    } else if ((booking.urutan > 120) && (booking.urutan <= 240)) {
        booking.sesi_um = 'Sesi 2'
        // 121 - 120 = 1 (start from 1)
        urutan = booking.urutan - 120
        if (urutan <= 40) {
            booking.ruang_um = 'Ruang A';
            booking.meja_um = 'A' + urutan;
        } else if ((urutan > 40) && (urutan <= 80)) {
            booking.ruang_um = 'Ruang B'
            booking.meja_um = 'B' + (urutan - 40);
        } else if ((urutan > 80) && (urutan <= 120)) {
            booking.ruang_um = 'Ruang C'
            booking.meja_um = 'C' + (urutan - 80);
        }
    
    // sesi 3
    } else if ((booking.urutan > 240) && (booking.urutan <= 360)) {
        booking.sesi_um = 'Sesi 3'
        // 241 - 240 = 1 (start from 1)
        urutan = booking.urutan - 240
        if (urutan <= 40) {
            booking.ruang_um = 'Ruang A';
            booking.meja_um = 'A' + urutan;
        } else if ((urutan > 40) && (urutan <= 80)) {
            booking.ruang_um = 'Ruang B'
            booking.meja_um = 'B' + (urutan - 40);
        } else if ((urutan > 80) && (urutan <= 120)) {
            booking.ruang_um = 'Ruang C'
            booking.meja_um = 'C' + (urutan - 80);
        }
    
    // sesi 4
    } else if ((booking.urutan > 360) && (booking.urutan <= 480)) { 
        booking.sesi_um = 'Sesi 4'
        // 361 - 360 = 1 (start from 1)
        urutan = booking.urutan - 360
        if (urutan <= 40) {
            booking.ruang_um = 'Ruang A';
            booking.meja_um = 'A' + urutan;
        } else if ((urutan > 40) && (urutan <= 80)) {
            booking.ruang_um = 'Ruang B'
            booking.meja_um = 'B' + (urutan - 40);
        } else if ((urutan > 80) && (urutan <= 120)) {
            booking.ruang_um = 'Ruang C'
            booking.meja_um = 'C' + (urutan - 80);
        }

    // sesi 5
    } else if ((booking.urutan > 480) && (booking.urutan <= 600)) { 
        booking.sesi_um = 'Sesi 5'
        // 481-480 = 1 (start from 1)
        urutan = booking.urutan - 480
        if (urutan <= 40) {
            booking.ruang_um = 'Ruang A';
            booking.meja_um = 'A' + urutan;
        } else if ((urutan > 40) && (urutan <= 80)) {
            booking.ruang_um = 'Ruang B'
            booking.meja_um = 'B' + (urutan - 40);
        } else if ((urutan > 80) && (urutan <= 120)) {
            booking.ruang_um = 'Ruang C'
            booking.meja_um = 'C' + (urutan - 80);
        }

    } else {
        // reset back start at 1
        booking.resetCount(function(err, nextCount) {

        });
    };    

    next()
});

// create model on this 
// BookingModel = mongoose.model('Booking', BookingSchema);

// console.log('pre');
// BookingSchema.pre('save', function(next) {
//     // check data if npm on data or not
//     BookingModel.findOne({npm_mhs: this.npm_mhs}, function(err, data) {
//         // check if data is exists
//         if (!data)
//             console.log('Data not found');

//         else {
//             console.log('Data found')
//             now = moment().format('ddd MMM D YYYY')
//             if (data.waktu.toDateString() == now)
//                 booking.urutan = urutan + 120
//         }
        
//     });
//     next();
// });

// create blok to reset if change day
// BookingModel.findOne({}, {}, { sort: { 'waktu': -1 } }, function(err, post) {
//     // console.log(post.waktu.toDateString());
//     if (!post) {
//         return err
//     }

//     now = moment().format('ddd MMM D YYYY')
//     // now = 'Sun Oct 28 2017'
//     if (post.waktu.toDateString() != now) {
//         BookingModel.resetCount(function(err, nextCount) {

//         });
//     }
// });

// // function
// BookingSchema.methods.checkNPM = function(npm) {
//     // compare npm from sesi
//     BookingModel.findOne({this.npm: npm})
// };

module.exports = mongoose.model('Booking', BookingSchema);
