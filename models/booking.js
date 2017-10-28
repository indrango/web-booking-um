const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    // id_booking: Number,
    // kd_voucher: Number,
    // npm_mhs: String,
    nama_mhs: String,
    // jenis_kel: String,
    // tgl_lahir: String,
    // fakultas: String,
    // jurusan: String,
    // email: String,
    // waktu: {
    //     type: Date,
    //     default: Date.now
    // }

    // post process
    // sesi_um: Date,
    // ruang_um: String,
    // meja_um: String
});

module.exports = mongoose.model('Booking', BookingSchema);
