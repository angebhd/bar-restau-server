const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    subType: { type: String, required: true },
    price: { type: Number, required: true },
});

const menuModel = new mongoose.model('menu', menuSchema, 'menu'); // modelName, schema, collectionName

module.exports = { menuModel }