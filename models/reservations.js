const mongoose = require('mongoose');
const { Schema } = mongoose;

const reservationSchema = new mongoose.Schema({
    // userID: { type: String, required: true },
    // tableID: { type: String, required: true },
    userID: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    tableID: { type: Schema.Types.ObjectId, ref: 'tables', required: true },
    date: { type: String, required: true },    
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
});

const reservationModel = new mongoose.model('reservations', reservationSchema);

module.exports = { reservationModel }