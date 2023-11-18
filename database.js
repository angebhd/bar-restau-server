
function saveReservation(rData) {

    const mongoose = require('mongoose')
    mongoose.connect('mongodb://localhost:27017/bar-restau', { useNewUrlParser: true })
///                             hostname or IP/ database name
    const reservationSchema = new mongoose.Schema({
        name: String,
        table: Number,
        time: Date,
    })

    const reservationModel = mongoose.model('reservationModel', reservationSchema, 'reservations') 
    ///    model                                model           schema               collection in db

    const reservationData = new reservationModel({
        name: rData.name,
        table: parseInt(rData.table),
        time: new Date(rData.time),
    })

    reservationData.save()
        .then((result)=>{
            console.log('Data saved successfully', result);
            mongoose.connection.close()
        })
}

module.exports = saveReservation;