const { orderModel } = require('../models/orders');
// const { menuModel } = require('../models/menu');

// const getAllMenu = async () => { return await menuModel.find() };
// const getPriceFromDB = async (id, qty) => {
//     const AllMenu = await getAllMenu();
//     const item = AllMenu.find(item => item._id.toString() === id.toString());
//     return item.price * qty
// }

const orders = {
    make: async function (req, res) {
        const customerId = req.tokenDecoded.id;
        const items = req.body.items;
        const totalAmount = req.body.totalAmount
        //// should validate the price from te databases, cause we can't trust what come from the user
        // const status = null
        // const orderDate = null;
        // const deliveryDateTime = null;
        const deliveryAddress = req.body.address;

        // const newReservation = new orderModel({ customerId, items, totalAmount, status, orderDate, deliveryDateTime, deliveryAddress });
        const newReservation = new orderModel({ customerId, items, totalAmount, deliveryAddress });
        try {
            await newReservation.save();
            res.status(200).send('Reservation made successfully');
        } catch (error) {
            console.log(error);
            res.status(200).send({ message: 'An error occurred during the reservation, try again later', error: true })
        }

    },
}


module.exports = { orders }