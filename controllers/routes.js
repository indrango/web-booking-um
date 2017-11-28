const Booking = require('../models/booking')
const adminControllers = require('./adminControllers')
const bookingControllers = require('./bookingControllers')

module.exports = function(app) {
    // admin routes
    app.get('/admin/dashboard', adminControllers.getAllData);
    app.get('/admin/dashboard/kursus', adminControllers.getKursus);
    // app.get('/api/admin/user', adminControllers.getAllUser);
    // app.post('/api/admin/create', adminControllers.crateUser);
    // app.post('/api/admin/delete/:user_id', adminControllers.deleteUser);
    app.get('/admin', adminControllers.getLogin);
    app.post('/admin/login', adminControllers.postLogin);
    app.post('/admin/logout', adminControllers.logout);

    // user routes
    app.get('/users/form', bookingControllers.getFormRegist);
    app.get('/users/edit', bookingControllers.editForm);
    app.get('/users/data', bookingControllers.getAllData);
    // app.post('/users/verif', bookingControllers.verifData);
    app.post('/users/submit', bookingControllers.submitData);
    app.post('/users/save', bookingControllers.saveData);
    // app.get('/users/:user_id', bookingControllers.getData);
    // app.post('/users/edit/:user_id', bookingControllers.editData);
    // app.post('/users/delete/:user_id', bookingControllers.deleteData);

};

