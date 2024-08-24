const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    link: { type: String, required: true }
});

const tableModel = new mongoose.model('tables', tableSchema);


module.exports = { tableModel }