const { reservationModel } = require('../models/reservations');
// const { mongoose } = require('mongoose');

const reservations = {
    make: async function (req, res) {
        const userID = req.tokenDecoded.id;
        const tableID = req.body.tableID;
        const date = req.body.date;
        const startTime = req.body.startTime;
        const endTime = req.body.endTime;

        const newReservation = new reservationModel({ userID, tableID, date, startTime, endTime });
        try {
            await newReservation.save();
            res.status(200).send('Reservation made successfully');
        } catch (error) {
            console.log(error);
            res.status(200).send({ message: 'An error occurred during the reservation, try again later', error: true })
        }
    },
    checkConflict: async (req, res) => {
        const check = async (table, date, startTime, endTime) => {
            try {
                const startConflict = await reservationModel.findOne({ tableID: table, date: date, startTime: { $lte: startTime }, endTime: { $gte: startTime } });
                if (startConflict) return { conflict: true, message: "Conflict with the start time", date: startConflict.date, start: startConflict.startTime, end: startConflict.endTime };

                const endConflict = await reservationModel.findOne({ tableID: table, date: date, startTime: { $lte: endTime }, endTime: { $gte: endTime } });
                if (endConflict) return { conflict: true, message: "Conflict with the end time", date: endConflict.date, start: endConflict.startTime, end: endConflict.endTime };

                const betweenConflict = await reservationModel.findOne({ tableID: table, date: date, startTime: { $gte: startTime }, endTime: { $lte: endTime } });
                if (betweenConflict) return { conflict: true, message: "There is a reservation in between", date: betweenConflict.date, start: betweenConflict.startTime, end: betweenConflict.endTime };
                return { conflict: false }
            } catch (error) {
                return { message: "Somthing wnt wrong", error: true };
            }
        }
        const conflict = await check(req.body.table, req.body.date, req.body.startTime, req.body.endTime)
        res.status(200).send(conflict);
    },
    get: async (req, res) => {
        // const userId = new mongoose.Types.ObjectId(req.tokenDecoded.id)

        try {
            const op = await reservationModel.find({ userID: req.tokenDecoded.id }).populate({path: 'userID', select: 'fullname mail'}).populate('tableID')
            res.status(200).send(op);
        } catch (error) {
            res.status(200).send({ message: 'Something went wrong', error: true });
            console.log(error);
        }


    }
}


module.exports = { reservations }