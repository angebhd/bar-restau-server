const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new mongoose.Schema({
    customerId: { type: Schema.Types.ObjectId, ref: 'users', required: true, },
    items: [{
        id: { type: Schema.Types.ObjectId, ref: 'menu', required: true },
        quantity: { type: Number, required: true, min: 1 }
    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
    orderDate: { type: Date, default: Date.now },
    deliveryDateTime: { type: Date },
    deliveryAddress: { type: String, required: true }
});

const orderModel = new mongoose.model('orders', orderSchema);


module.exports = { orderModel }